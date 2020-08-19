import {useCallback, useEffect, useRef, useState} from 'react'

interface FadeHookResult {
  fadeOut: (onFaded: () => void) => void
  style: React.CSSProperties
}
const useFadeInFadeOut = (durationMs = 300): FadeHookResult => {
  const [isVisible, setVisible] = useState(false)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect((): void => setVisible(true), [])
  useEffect((): void => timeouts.current.forEach(clearTimeout), [])

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${durationMs}ms`,
  }

  const fadeOut = useCallback((onFaded: (() => void)): void => {
    setVisible(false)
    timeouts.current.push(setTimeout(onFaded, durationMs))
  }, [durationMs])
  return {fadeOut, style}
}

// TODO(cyrille): Make a fading Link component.
export {useFadeInFadeOut}
