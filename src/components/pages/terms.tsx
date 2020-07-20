import React from 'react'
import ReactMarkdown from 'react-markdown'
import {useTranslation} from 'react-i18next'

import {STATIC_NAMESPACE} from 'store/i18n'


// This is a top level page and should be nested only with caution.
// TOP LEVEL PAGE
const TermsPage = (props: {style?: React.CSSProperties}): React.ReactElement => {
  const {t} = useTranslation()
  const [translate] = useTranslation(STATIC_NAMESPACE)
  const {style = {padding: '40px 30px'}} = props
  const email = 'contact@mavoie.org'
  return <div style={style}>
    <ReactMarkdown source={translate('termsOfService', {
      canonicalUrl: t('canonicalUrl'),
      host: 'gandi – 63-65 Boulevard Masséna 75013 Paris 01 70 37 76 61',
      owner: 'Chance / MaVoie.org',
      productName: t('productName').toLocaleUpperCase(),
      publisher: `MaVoie.org – ${email} Le responsable publication ` +
      'est une personne physique ou une personne morale.',
      webmaster: 'John Métois – contact@mavoie.org',
    })} />
  </div>
}


export default React.memo(TermsPage)
