import React, {useEffect, useState} from 'react'
import {useTranslation, Trans} from 'react-i18next'

import Layout from 'components/layout'
import StepValidationButton from 'components/step_validation_button'

const contentStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 25,
  lineHeight: 1.15,
  margin: '0 10px 20px',
  textAlign: 'center',
}
const buttonContainerStyle: React.CSSProperties = {
  paddingTop: 20,
}
const layoutContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const GoPage = (): React.ReactElement => {
  const {t} = useTranslation()

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [setIsVisible])

  const layoutStyle: React.CSSProperties = {
    height: '100vh',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 300ms',
  }

  return <Layout header={t('Définition')} bigTitle={t('Félicitations\u00A0!')} style={layoutStyle}>
    <div style={layoutContentStyle}>
      <div>
        <Trans parent="p" style={contentStyle}>
          Votre projet semble clair et cohérent.
        </Trans>
        <Trans parent="p" style={contentStyle}>
          Il est temps maintenant de vérifier ensemble vos compétences.
        </Trans>
        <Trans parent="p" style={contentStyle}>
          Vous êtes prêt·e&nbsp;?
        </Trans>
      </div>
      <div style={buttonContainerStyle}>
        <StepValidationButton stepId="definition" stepValue="notRequired">
          {t('C\'est parti\u00A0!')}
        </StepValidationButton>
      </div>
    </div>
  </Layout>
}

export default React.memo(GoPage)
