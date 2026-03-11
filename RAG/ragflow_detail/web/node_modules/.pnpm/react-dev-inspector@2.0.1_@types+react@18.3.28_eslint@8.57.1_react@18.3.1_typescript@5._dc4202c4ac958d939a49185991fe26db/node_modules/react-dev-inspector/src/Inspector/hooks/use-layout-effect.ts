import {
  useEffect,
  useLayoutEffect as _useLayoutEffect,
} from 'react'


export const useLayoutEffect = (
  typeof window !== 'undefined'
  // @ts-expect-error `window` is not available in SSR
  && window?.document?.createElement
)
  ? _useLayoutEffect
  : useEffect
