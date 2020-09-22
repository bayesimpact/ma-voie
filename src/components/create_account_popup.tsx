import _uniqueId from 'lodash/uniqueId'
import CloseIcon from 'mdi-react/CloseIcon'
import React, {useCallback, useEffect, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import {colorToAlpha} from 'components/colors'
import iconDance from 'images/icon-dance.svg'

const stopPropagation = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation()
}

const popupContainerStyle: React.CSSProperties = {
  backgroundColor: colorToAlpha(colors.TURQUOISE_BLUE, 0.88),
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
const iconStyle: React.CSSProperties = {
  height: 118,
  margin: 'auto',
  width: 108,
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
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
interface Props {
  onClose: () => void
  style?: React.CSSProperties
}
const CreateAccountPopup = ({onClose, style}: Props): React.ReactElement => {
  const {t} = useTranslation()
  const [titleId] = useState(_uniqueId)

  const globalStyle: React.CSSProperties = {
    ...popupContainerStyle,
    ...style,
  }
  const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    onClose()
  }, [onClose])

  useEffect((): (() => void) => {
    document.body.style.overflow = 'hidden'
    return (): void => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return <div
    style={globalStyle} onClick={handleClose} role="dialog" aria-modal={true}
    aria-labelledby={titleId}>
    <div style={popupCloseStyle} onClick={handleClose} role="button">
      <CloseIcon aria-label={t('fermer la pop-up')} />
    </div>
    <div style={popupStyle} onClick={stopPropagation}>
      <div style={iconStyle}><img src={iconDance} alt="" /></div>
      <Trans>
        <h1 style={titleStyle} id={titleId}>C'est le bon moment de créer un compte&nbsp;!</h1>
        <p style={paragraphStyle}>
          Créer un compte permet de sauvegarder votre progression et d'accéder
          aux meilleures ressources pour votre futur emploi, <strong>gratuitement</strong>.
        </p>
      </Trans>
      <Link to={getPath(['SIGNUP'], t)} style={linkStyle}>
        <Button type="firstLevel" >{t('Créer un compte')}</Button>
      </Link>
    </div>
  </div>
}

export default React.memo(CreateAccountPopup)
