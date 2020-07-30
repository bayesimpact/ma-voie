import React from 'react'
import {useTranslation, Trans} from 'react-i18next'

import {prepareT} from 'store/i18n'

import Button from 'components/button'
import Layout from 'components/layout'

const paragraphStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 22,
  lineHeight: 1.15,
  textAlign: 'center',
}
const buttonStyle: React.CSSProperties = {
  marginTop: 20,
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SkillsGoPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const bigTitle = prepareT('Félicitations\u00A0!')
  // FIXME(émilie): Go to prepare the interview
  return <Layout header={t('Compétences')} bigTitle={bigTitle}>
    <Trans>
      <p style={paragraphStyle}>
        Votre projet est clair et en plus vous avez les compétences essentielles&nbsp;!
      </p>
      <p style={paragraphStyle}>
        Une formation n'est donc pas nécessaire pour vous.
      </p>
      <p style={paragraphStyle}>
        Vous êtes prêt·e pour postuler au poste.
      </p>
      <p style={paragraphStyle}>
        Et le mieux, c'est qu'on va vous aider à bien vous préparer&nbsp;:)
      </p>
    </Trans>
    <Button bgColor={colors.TEAL_BLUE} style={buttonStyle}>
      {t('C\'est parti\u00A0!')}
    </Button>
  </Layout>
}

export default React.memo(SkillsGoPage)
