import {
  useEffect,
  useRef,
  type MutableRefObject,
} from 'react'


export const useMousePosition = ({ disable }: {
  disable?: boolean;
}): MutableRefObject<{ x: number; y: number }> => {
  const mouseRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const recordMousePoint = (ev: MouseEvent) => {
    mouseRef.current.x = ev.clientX
    mouseRef.current.y = ev.clientY
  }

  useEffect(() => {
    if (!disable) {
      document.addEventListener('mousemove', recordMousePoint, true)
    }

    return () => {
      document.removeEventListener('mousemove', recordMousePoint, true)
    }
  }, [disable])

  return mouseRef
}
