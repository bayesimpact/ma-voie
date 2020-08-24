import React, {useCallback} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {useHistory} from 'react-router'

import {useFadeInFadeOut} from 'hooks/fade'
import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import StepValidationButton from 'components/step_validation_button'

const contentStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 21,
  lineHeight: 1.15,
  margin: '30px 0 10px',
  textAlign: 'left',
}
const buttonContainerStyle: React.CSSProperties = {
  paddingTop: 20,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const RedefinePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()

  const {fadeOut, style} = useFadeInFadeOut()

  const onClick = useCallback((): void => {
    fadeOut(() =>
      history.push(getPath(['DEFINITION', 'PARTNERS_INTERNAL'], t)))
  }, [history, fadeOut, t])

  return <Layout header={t('Définition')} style={style}>
    <Trans parent="p" style={contentStyle}>
      Votre projet est clair mais ne semble pas vous passionner.
    </Trans>
    <Trans parent="p" style={contentStyle}>
      C'est sûrement le bon moment pour que vous redéfinissiez votre
      projet et trouviez un métier qui vous passionne.
    </Trans>
    <Trans parent="p" style={contentStyle}>
      On est prêts à vous accompagner dans cette démarche&nbsp;:)
    </Trans>
    <Trans parent="p" style={contentStyle}>
      Qu'en pensez-vous&nbsp;?
    </Trans>
    <div style={buttonContainerStyle}>
      <Button type="secondLevel" onClick={onClick}>{t('Je redéfinis mon projet')}</Button>
    </div>
    <div style={buttonContainerStyle}>
      <StepValidationButton stepId="definition" stepValue="notRequired">
        {t('Je continue avec ce métier')}
      </StepValidationButton>
    </div>
  </Layout>
}

export default React.memo(RedefinePage)
