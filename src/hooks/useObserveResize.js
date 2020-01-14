import { useCallback, useRef, useMemo } from 'react'
import ResizeObserver from 'resize-observer-polyfill';

export default function useObserveResize(givenCallback) {
  const callbackRef = useRef(givenCallback)
  callbackRef.current = givenCallback

  const observer = useMemo(() => new ResizeObserver((...props) => callbackRef.current(...props)), [])

  return useCallback((element => {
    if (element === null) {
      observer.disconnect()
    } else {
      observer.observe(element)
    }
  }))
}