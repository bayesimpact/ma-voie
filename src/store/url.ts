import {TFunction} from 'i18next'
import {useTranslation} from 'react-i18next'
import {useRouteMatch} from 'react-router'

import Routes from 'translations/fr/url_i18next.json'


export type PageSegment = keyof typeof Routes
export type Page = readonly PageSegment[]


const pathCache: {[pathname: string]: Page} = {}


function getPath(segments: Page, translate: TFunction): string {
  const path = '/' + segments.map(segment => translate(segment, {ns: 'url'})).join('/')
  pathCache[path] = segments
  return path
}

function getSimplePath(segment: PageSegment, translate: TFunction): string {
  return getPath([segment], translate)
}

function useSubPathDefiner(): (segment: PageSegment) => string {
  const {t} = useTranslation('url')
  const {url} = useRouteMatch()
  const prefix = url === '/' ? '' : url
  return (segment: PageSegment): string => prefix + getSimplePath(segment, t)
}


// Find a page that matches a given pathname.
// TODO(cyrille): Drop since unused.
function getPage(pathname: string): Page|undefined {
  const page = pathCache[pathname]
  if (page) {
    return page
  }
  return undefined
}


export {getPage, getPath, useSubPathDefiner}
