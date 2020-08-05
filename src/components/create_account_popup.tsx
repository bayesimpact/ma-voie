import CloseIcon from 'mdi-react/CloseIcon'
import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import {colorToAlpha} from 'components/colors'
import iconDance from 'images/icon-dance.svg'

const popupContainerStyle: React.CSSProperties = {
  backgroundColor: colorToAlpha(colors.TURQUOISE_BLUE, 0.88),
  color: colors.DARK_FOREST_GREEN,
  height: '100vh',
  left: 0,
  position: 'fixed',
  top: 0,
  width: '100%',
}
const popupStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 20,
  margin: '70px 30px 30px',
  padding: 30,
}
const popupCloseStyle: React.CSSProperties = {
  color: '#fff',
  position: 'absolute',
  right: 20,
  top: 20,
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

  const globalStyle: React.CSSProperties = {
    ...popupContainerStyle,
    ...style,
  }
  const handleClose = useCallback((): void => {
    onClose()
  }, [onClose])

  return <div style={globalStyle}>
    <div style={popupCloseStyle} onClick={handleClose}><CloseIcon /></div>
    <div style={popupStyle}>
      <div style={iconStyle}><img src={iconDance} alt="" /></div>
      <Trans>
        <h1 style={titleStyle}>C'est le bon moment de créer un compte&nbsp;!</h1>
        <p style={paragraphStyle}>
          Créer un compte permet de sauvegarder votre progression et d'accéder
          aux meilleures ressources pour ton futur emploi, <strong>gratuitement</strong>.
        </p>
      </Trans>
      <Link to={getPath('ACCOUNT', t)} style={linkStyle} >
        <Button type="firstLevel" >{t('Créer un compte')}</Button>
      </Link>
    </div>
  </div>
}

export default React.memo(CreateAccountPopup)
