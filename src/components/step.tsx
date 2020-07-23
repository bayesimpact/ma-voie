import React from 'react'
import {useTranslation} from 'react-i18next'

import lockIcon from 'images/lock-ico.svg'

const notAvailable = (): void => window.alert('Bientôt disponible...')

const headerStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: colors.TEAL_BLUE,
  color: '#fff',
  display: 'flex',
  height: 40,
  justifyContent: 'center',
  textAlign: 'center',
}
const indexStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
  margin: '0 auto',
  textTransform: 'uppercase',
}
const titleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold',
}
const buttonStyle: React.CSSProperties = {
  alignSelf: 'stretch',
  backgroundColor: colors.REDDISH_ORANGE,
  border: 0,
  borderRadius: 25,
  color: '#fff',
  cursor: 'pointer',
  fontSize: 18,
  fontWeight: 'bold',
  height: 50,
}
const forbiddenStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 'bold',
}
interface Props {
  children: React.ReactNode
  color: string
  icon: string
  index: number
  isOpen?: boolean
  style?: React.CSSProperties
}
const Step = ({children, color, icon, index, isOpen, style}: Props): React.ReactElement => {
  const {t} = useTranslation()
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    border: `1px solid ${isOpen ? 'transparent' : colors.SILVER_TWO}`,
    borderRadius: 20,
    boxShadow: isOpen ? '0 4px 24px 0 rgba(0,0,0,.2)' : 'initial',
    fontSize: 13,
    overflow: 'hidden',
    ...style,
  }
  const contentStyle: React.CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: isOpen ? '25px 30px 30px' : 35,
  }
  const iconStyle: React.CSSProperties = {
    backgroundColor: color,
    borderRadius: 35,
    height: 70,
    margin: 20,
    width: 70,
  }
  return <div style={containerStyle}>
    {isOpen ? <div style={headerStyle}>{t('En cours')}</div> : null}
    <div style={contentStyle}>
      <div style={indexStyle}>{t('étape {{index}}', {index})}</div>
      <div style={titleStyle}>{children}</div>
      <img style={iconStyle} src={isOpen ? icon : lockIcon} alt="" />
      {isOpen ? <button onClick={notAvailable} style={buttonStyle}>{t('Commencez')}</button> :
        // TODO(cyrille): Replace with the list of steps to complete beforehand.
        <span style={forbiddenStyle}>{t("Terminez l'étape précédente", {count: index - 1})}</span>}
    </div>
  </div>
}
export default React.memo(Step)
