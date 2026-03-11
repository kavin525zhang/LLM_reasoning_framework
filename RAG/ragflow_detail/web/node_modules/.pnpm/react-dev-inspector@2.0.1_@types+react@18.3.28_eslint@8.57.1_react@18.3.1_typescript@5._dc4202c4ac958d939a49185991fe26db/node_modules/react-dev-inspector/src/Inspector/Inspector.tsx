'use client'

import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import type { Fiber } from 'react-reconciler'
import hotkeys from 'hotkeys-js'
import {
  setupHighlighter,
  getElementCodeInfo,
  gotoServerEditor,
  getElementInspect,
  type CodeInfo,
} from './utils'
import {
  useLayoutEffect,
  useEffectEvent,
  useMousePosition,
} from './hooks'
import { Overlay } from './Overlay'


/**
 * the inspect meta info that is sent to the callback when an element is hovered over or clicked.
 */
export interface InspectParams {
  /** hover / click event target dom element */
  element: HTMLElement;
  /** nearest named react component fiber for dom element */
  fiber?: Fiber;
  /** source file line / column / path info for react component */
  codeInfo?: CodeInfo;
  /** react component name for dom element */
  name?: string;
}

/**
 * `v2.0.0` changes:
 *   - make 'Ctrl + Shift + Alt + C' as default shortcut on Windows/Linux
 *   - export `defaultHotkeys`
 */
export const defaultHotkeys = () => navigator.platform?.startsWith('Mac')
  ? ['Ctrl', 'Shift', 'Command', 'C']
  : ['Ctrl', 'Shift', 'Alt', 'C']

export interface InspectorProps {
  /**
   * Inspector Component toggle hotkeys,
   *
   * supported keys see: https://github.com/jaywcjlove/hotkeys#supported-keys
   *
   * @default - `['Ctrl', 'Shift', 'Command', 'C']` on macOS, `['Ctrl', 'Shift', 'Alt', 'C']` on other platforms.
   *
   * Setting `keys={null}` explicitly means that disable use hotkeys to trigger it.
   */
  keys?: string[] | null;

  /**
   * If setting `active` prop, the Inspector will be a Controlled React Component,
   *   you need to control the `true`/`false` state to active the Inspector.
   *
   * If not setting `active` prop, this only a Uncontrolled component that
   *   will activate/deactivate by hotkeys.
   *
   * > add in version `v2.0.0`
   */
  active?: boolean;

  /**
   * Trigger by `active` state change, includes:
   * - hotkeys toggle, before activate/deactivate Inspector
   * - Escape / Click, before deactivate Inspector
   *
   * will NOT trigger by `active` prop change.
   *
   * > add in version `v2.0.0`
   */
  onActiveChange?: (active: boolean) => void;

  /**
   * Whether to disable all behavior include hotkeys listening or trigger,
   * will automatically disable in production environment by default.
   *
   * @default `true` if `NODE_ENV` is 'production', otherwise is `false`.
   * > add in version `v2.0.0`
   */
  disable?: boolean;

  /**
   * Callback when left-clicking on an element, with ensuring the source code info is found.
   *
   * By setting the `onInspectElement` prop, the default behavior ("open local IDE") will be disabled,
   *   that means you want to manually handle the source info, or handle how to goto editor by yourself.
   *
   * You can also use builtin `gotoServerEditor` utils in `onInspectElement` to get origin behavior ("open local IDE on server-side"),
   *   it looks like:
   *
   * ```tsx
   * import { Inspector, gotoServerEditor } from 'react-dev-inspector'
   *
   * <Inspector
   *   onInspectElement={({ codeInfo }) => {
   *     ...; // your processing
   *     gotoServerEditor(codeInfo)
   *   }}
   * </Inspector>
   * ```
   *
   * > add in version `v2.0.0`
   */
  onInspectElement?: (params: Required<InspectParams>) => void;

  /** Callback when hovering on an element */
  onHoverElement?: (params: InspectParams) => void;

  /**
   * Callback when left-clicking on an element.
   */
  onClickElement?: (params: InspectParams) => void;

  /** any children of react nodes */
  children?: ReactNode;

  /**
   * Whether to disable default behavior: "launch to local IDE when click on component".
   *
   * @default `true` if setting `onInspectElement` callback, otherwise is `false`.
   * @deprecated please use `onInspectElement` callback instead for fully custom controlling.
   */
  disableLaunchEditor?: boolean;
}

export const Inspector = (props: InspectorProps) => {
  const {
    keys,
    onHoverElement,
    onClickElement,
    onInspectElement,
    active: controlledActive,
    onActiveChange,
    disableLaunchEditor,
    disable = (process.env.NODE_ENV !== 'development'),
    children,
  } = props

  const [isActive, setActive] = useState<boolean>(controlledActive ?? false)

  // sync state as controlled component
  useLayoutEffect(() => {
    if (controlledActive !== undefined) {
      setActive(controlledActive)
    }
  }, [controlledActive])

  useEffect(() => {
    isActive
      ? startInspect()
      : stopInspect()

    return stopInspect
  }, [isActive])

  // hotkeys-js params need string
  const hotkey: string | null = keys === null
    ? null
    : (keys ?? []).join('+')

  /** inspector tooltip overlay */
  const overlayRef = useRef<Overlay>()
  const mouseRef = useMousePosition({ disable })

  const activate = useEffectEvent(() => {
    onActiveChange?.(true)
    if (controlledActive === undefined) {
      setActive(true)
    }
  })

  const deactivate = useEffectEvent(() => {
    onActiveChange?.(false)
    if (controlledActive === undefined) {
      setActive(false)
    }
  })

  const startInspect = useEffectEvent(() => {
    if (overlayRef.current || disable) return

    const overlay = new Overlay()
    overlayRef.current = overlay

    hotkeys(`esc`, deactivate)

    const stopCallback = setupHighlighter({
      onPointerOver: handleHoverElement,
      onClick: handleClickElement,
    })

    overlay.setRemoveCallback(stopCallback)

    // inspect element immediately at mouse point
    const initPoint = mouseRef.current
    const initElement = document.elementFromPoint(initPoint.x, initPoint.y)
    if (initElement) handleHoverElement(initElement as HTMLElement)
  })

  const stopInspect = useEffectEvent(() => {
    overlayRef.current?.remove()
    overlayRef.current = undefined

    hotkeys.unbind(`esc`, deactivate)
  })

  const handleHoverElement = useEffectEvent((element: HTMLElement) => {
    const overlay = overlayRef.current

    const codeInfo = getElementCodeInfo(element)
    const relativePath = codeInfo?.relativePath
    const absolutePath = codeInfo?.absolutePath

    const { fiber, name, title } = getElementInspect(element)

    overlay?.inspect?.([element], title, relativePath ?? absolutePath)

    onHoverElement?.({
      element,
      fiber,
      codeInfo,
      name,
    })
  })

  const handleClickElement = useEffectEvent((element: HTMLElement) => {
    deactivate()

    const codeInfo = getElementCodeInfo(element)
    const { fiber, name } = getElementInspect(element)

    onClickElement?.({
      element,
      fiber,
      codeInfo,
      name,
    })

    if (fiber && codeInfo) {
      onInspectElement?.({
        element,
        fiber,
        codeInfo,
        name: name!,
      })

      if (!onInspectElement && !disableLaunchEditor) {
        gotoServerEditor(codeInfo)
      }
    }
  })

  useEffect(() => {
    const handleHotKeys = () => {
      overlayRef.current
        ? deactivate()
        : activate()
    }

    const bindKey = (hotkey === null || disable)
      ? null
      : (hotkey || defaultHotkeys().join('+'))

    if (bindKey) {
      // https://github.com/jaywcjlove/hotkeys
      hotkeys(bindKey, handleHotKeys)

      return () => {
        hotkeys.unbind(bindKey, handleHotKeys)
      }
    }
  }, [hotkey, disable])

  return (<>{children ?? null}</>)
}
