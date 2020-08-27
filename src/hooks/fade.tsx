// TODO(cyrille): Move to components.
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'
import {LinkProps} from 'react-router-dom'

import {Page, getPath} from 'store/url'

interface FadeHookResult {
  fadeOut: (onFaded: () => void) => void
  fadeTo: (page: Page) => void
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

  const history = useHistory()
  const {t} = useTranslation('url')
  const fadeTo = useCallback(
    (page: Page): void => fadeOut(() => history.push(getPath(page, t))),
    [fadeOut, history, t],
  )
  return {fadeOut, fadeTo, style}
}

// TODO(cyrille): Consider dropping the limitation to string `to`.
// TODO(cyrille): Consider dropping the limitation to `push`.
interface FadingLinkProps extends Omit<LinkProps, 'replace'|'to'>, Pick<FadeHookResult, 'fadeTo'> {
  to: Page
}

const FadingLink = ({fadeTo, to, onClick, ...props}: FadingLinkProps): React.ReactElement => {
  const onFadingClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    fadeTo(to)
  }, [fadeTo, onClick, to])
  return <a href="javascript:void 0" {...props} onClick={onFadingClick} />
}
export {useFadeInFadeOut}

export default React.memo(FadingLink)
