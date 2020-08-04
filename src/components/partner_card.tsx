import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'

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

interface Props {
  details?: string
  info: string
  // TODO(émilie): rename "list" to be more specific such as descriptionList
  list: readonly string[]
  logo: string
  onChoose?: (event: React.MouseEvent<HTMLDivElement>) => void
  onClick?: (partnerId: string) => void
  onDiscover?: (event: React.MouseEvent<HTMLDivElement>) => void
  partnerId?: string
  style?: React.CSSProperties
  title: string
}
const PartnerCard = ({
  details, info, partnerId, list, logo, onChoose, onClick, onDiscover, style, title,
}: Props): React.ReactElement => {
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
  return <div style={finalContainerStyle} onClick={handleClick} id={partnerId} data-partner>
    <div style={contentStyle}>
      <div style={titleStyle}>
        <img src={logo} alt="logo" style={imageStyle} />
        <div style={titleDetailsStyle}>
          <div style={titleDetailsBoldStyle}>{title}</div>
          <div style={titleDetailsContentStyle}>{details}</div>
        </div>
      </div>
      <ul style={descriptionStyle}>
        {list.map(item =>
          <li key={item}>{item}</li>,
        )}
      </ul>
      <Button type="reddish_orange" onClick={onChoose}>{t('Choisir')}</Button>
      <Button type="white_no_border" onClick={onDiscover} >{t('Découvrir')}</Button>
    </div>
    <div style={infoStyle}>{info}</div>
  </div>
}
export default React.memo(PartnerCard)
