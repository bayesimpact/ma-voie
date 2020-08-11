import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'

const containerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 20,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,.2)',
  fontSize: 13,
  margin: '20px 0',
  minWidth: 315,
  overflow: 'hidden',
  position: 'relative',
}
const contentStyle: React.CSSProperties = {
  margin: '0 32px 50px 20px',
}
const titleStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 0 25px',
}
const titleDetailsStyle: React.CSSProperties = {
  textAlign: 'right',
}
const titleDetailsBoldStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 'bold',
}
const titleDetailsContentStyle: React.CSSProperties = {
  fontSize: 12,
  marginTop: -3,
}
const imageStyle: React.CSSProperties = {
  width: 126,
}
const descriptionStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 14,
  lineHeight: 1.2,
  marginBottom: 12,
  marginLeft: -10,
  paddingBottom: 10,
}
const infoStyle: React.CSSProperties = {
  backgroundColor: colors.TEAL_BLUE,
  bottom: 0,
  color: '#fff',
  left: 0,
  marginTop: 12,
  padding: '12px 60px',
  position: 'absolute',
  width: '100%',
}
const discreetAnchorStyle: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
}

export interface PartnerProps {
  details?: string
  description?: string
  discoverUrl?: string
  logo: string
  name: string
  partnerId: string
  title?: string
  url: string
  userCount?: number
}
interface Props extends PartnerProps {
  onClick?: (partnerId: string) => void
  style?: React.CSSProperties
}
const PartnerCard = (props: Props): React.ReactElement => {
  const {description, details, url, discoverUrl = url, logo, name, onClick, partnerId, style, title,
    userCount = 1} = props
  const {t} = useTranslation()
  const finalContainerStyle: React.CSSProperties = {
    ...containerStyle,
    ...style,
  }
  const handleClick = useCallback((): void => {
    if (onClick && partnerId) {
      onClick(partnerId)
    }
  }, [partnerId, onClick])
  const choosePartner = useCallback((): void => {
    // TODO(cyrille): Add user info to url.
    // TODO(cyrille): Add chosen partners in user state.
    window.open(url, '_blank')
  }, [url])
  return <div style={finalContainerStyle} onClick={handleClick} id={partnerId} data-partner>
    <div style={contentStyle}>
      <div style={titleStyle}>
        <img src={logo} alt="logo" style={imageStyle} />
        <div style={titleDetailsStyle}>
          <div style={titleDetailsBoldStyle}>{title}</div>
          <div style={titleDetailsContentStyle}>{details}</div>
        </div>
      </div>
      <div style={descriptionStyle}><ReactMarkdown source={description} /></div>
      <Link style={discreetAnchorStyle} to={getPath(['STEPS'], t)} onClick={choosePartner}>
        <Button type="firstLevel">{t('Choisir')}</Button>
      </Link>
      <a style={discreetAnchorStyle} href={discoverUrl} rel="noopener noreferrer" target="_blank">
        <Button type="discret">{t('Découvrir')}</Button>
      </a>
    </div>
    <Trans count={userCount} style={infoStyle}>
      {{userCount}} personne a choisi {{name}}
    </Trans>
  </div>
}
export default React.memo(PartnerCard)
