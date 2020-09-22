import _uniqueId from 'lodash/uniqueId'
import CloseIcon from 'mdi-react/CloseIcon'
import React, {useCallback, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'

import {useDispatch, resetProject} from 'store/actions'

import Button from 'components/button'
import {colorToAlpha} from 'components/colors'

const stopPropagation = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation()
}

const popupContainerStyle: React.CSSProperties = {
  backgroundColor: colorToAlpha(colors.DARK_FOREST_GREEN, 0.5),
  color: colors.DARK_FOREST_GREEN,
  height: '100vh',
  left: 0,
  padding: '0 30px',
  position: 'fixed',
  right: 0,
  top: 0,
  // Move on top of the menu.
  zIndex: 1,
}
const popupStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 20,
  margin: '70px auto 30px',
  maxWidth: 400,
  padding: 30,
}
const popupCloseStyle: React.CSSProperties = {
  color: '#fff',
  cursor: 'pointer',
  padding: 10,
  position: 'absolute',
  right: 10,
  top: 10,
}
const titleStyle: React.CSSProperties = {
  fontSize: 24,
  letterSpacing: 0.6,
  textAlign: 'center',
}
const paragraphStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: '1.5',
  textAlign: 'center',
}
interface Props {
  onClose: () => void
  style?: React.CSSProperties
}
const ResetProjectPopup = ({onClose, style}: Props): React.ReactElement => {
  const {t} = useTranslation()
  const [titleId] = useState(_uniqueId)
  const dispatch = useDispatch()

  const globalStyle: React.CSSProperties = {
    ...popupContainerStyle,
    ...style,
  }
  const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    onClose()
  }, [onClose])

  const handleReset = useCallback((): void => {
    dispatch(resetProject())
    onClose()
  }, [dispatch, onClose])

  return <div
    style={globalStyle} onClick={handleClose} role="dialog" aria-modal={true}
    aria-labelledby={titleId}>
    <div style={popupCloseStyle} onClick={handleClose} role="button">
      <CloseIcon aria-label={t('fermer la pop-up')} />
    </div>
    <div style={popupStyle} onClick={stopPropagation}>
      <Trans>
        <h1 style={titleStyle} id={titleId}>Recommencer mon projet</h1>
        <p style={paragraphStyle}>
          En cliquant sur <strong>"continuer"</strong>, votre projet sera réinitialisé.
          Vous perdrez par conséquent votre avancement et repartirez de zéro.
        </p>
      </Trans>
      <Button type="firstLevel" onClick={handleReset}>{t('Continuer')}</Button>
      <Button type="discreet" onClick={handleClose}>{t('Annuler')}</Button>
    </div>
  </div>
}

export default React.memo(ResetProjectPopup)
