// TODO(cyrille): Move to components.
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router'
import {Link, LinkProps} from 'react-router-dom'

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

// TODO(cyrille): Consider dropping the limitation to string `to`.
// TODO(cyrille): Consider dropping the limitation to `push`.
type FadingLinkProps = Omit<LinkProps, 'replace'> & Pick<FadeHookResult, 'fadeOut'> & {to: string}

const FadingLink = ({fadeOut, to, onClick, ...props}: FadingLinkProps): React.ReactElement => {
  const history = useHistory()
  const onFadingClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    fadeOut((): void => history.push(to))
  }, [fadeOut, history, onClick, to])
  if (!fadeOut) {
    return <Link to={to} onClick={onClick} {...props} />
  }
  return <a href="javascript:void 0" {...props} onClick={onFadingClick} />
}
export {useFadeInFadeOut}

export default React.memo(FadingLink)
