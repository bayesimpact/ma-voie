import React from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import Tip from 'components/tip'

const containerStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  marginTop: 40,
}
const titleStyle: React.CSSProperties = {
  fontSize: 22,
}
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const TrainingWhichPage = (): React.ReactElement => {
  const {t} = useTranslation()
  return <Layout header={t('Formation')}>
    <Trans style={containerStyle}>
      <h1 style={titleStyle}>Quelle formation&nbsp;?</h1>
      <p>
        Choisissez une formation en fonction de ce qui vous plaît et de vos capacités financières.
      </p>
    </Trans>
    <Tip title={t('Astuce')}>
      <Trans>Vous pouvez utiliser votre crédit CPF pour financer votre formation.</Trans>
    </Tip>
    <Link to={getPath(['TRAINING', 'PARTNERS_INTERNAL'], t)} style={linkStyle} >
      <Button type="firstLevel" >{t('Commencer')}</Button>
    </Link>
  </Layout>
}

export default React.memo(TrainingWhichPage)
