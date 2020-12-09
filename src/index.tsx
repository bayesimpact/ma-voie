import i18next, {ReadCallback} from 'i18next'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {initReactI18next, useTranslation} from 'react-i18next'

import faviconImage from 'images/favicon.ico'
import snippetImage from 'images/snippet.jpg'

interface TemplateProps {
  lang: 'fr' | 'en'
  snippetImage: string
}

class StaticI18nBackend {
  public static type = 'backend' as const

  public read(language: string, namespace: string, callback: ReadCallback): void {
    const resources = require(`translations/${language}/${namespace}_i18next.json`)
    callback(null, resources)
  }
}

i18next.
  use(initReactI18next).
  use(StaticI18nBackend).
  init({
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
    nsSeparator: false,
    preload: ['fr', 'en'],
    react: {
      defaultTransParent: 'div',
    },
    saveMissing: false,
    // TODO(cyrille): Use extraction for pt-BR.
    whitelist: ['fr', 'en', 'pt-BR'],
  })

export const Template = (props: TemplateProps): React.ReactElement => {
  const {lang, snippetImage} = props
  const {t} = useTranslation('translation', {useSuspense: false})
  return <html lang={lang}>
    <head>
      <meta charSet="utf-8" />
      <title>{t('productName')}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        name="viewport" id="viewport" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={t("$t(productName) \u2014 La plateforme qui optimise votre chemin vers l'emploi")}
      />
      <meta
        property="og:description" name="description"
        content={t("Sur le chemin de l'emploi et en ligne, $t(productName) vous offre un " +
          'parcours adapté à vos besoins.')} />
      <meta
        property="og:image" name="image" content={config.canonicalUrl + snippetImage} />
      <meta property="og:url" content={config.canonicalUrl} />

      <link rel="icon" href={faviconImage} type="image/x-icon" />
    </head>
    <body style={{margin: 0}}>
      <div id="app">{/* TODO(cyrille): Add a static element here. */}</div>
    </body>
  </html>
}

export const makeIndexHtml = (lng: 'fr' | 'en', snippetImage: string): string => {
  i18next.changeLanguage(lng)
  return '<!doctype html>' +
    ReactDOMServer.renderToString(<Template lang={lng} snippetImage={snippetImage} />)
}


export default (): string => makeIndexHtml('fr', snippetImage)
