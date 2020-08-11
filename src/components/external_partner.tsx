import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import {PartnerProps} from 'components/partner_card'



const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const partnerContainerStyle: React.CSSProperties = {
  borderBottom: `2px solid ${colors.SILVER_TWO}`,
  color: colors.DARK_FOREST_GREEN,
  width: '100%',
}
const partnerHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '23px 0 15px',
  width: '100%',
}
const partnerHeaderNameStyle: React.CSSProperties = {
  flex: '1',
  fontFamily: 'Lato, Helvetica',
  fontSize: 15,
}
const partnerHeaderMoreStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold',
}
const partnerDetailsStyle: React.CSSProperties = {
}
const partnerTitleStyle: React.CSSProperties = {
  display: 'flex',
  marginBottom: 10,
}
const partnerTitleLogoStyle: React.CSSProperties = {
  height: 62,
  width: 62,
}
const partnerTitleNameStyle: React.CSSProperties = {
  flex: '1',
  fontSize: 18,
  paddingLeft: 20,
}
const partnerTitleNameNameStyle: React.CSSProperties = {
  fontWeight: 'bold',
}
const partnerTitleNameDetailsStyle: React.CSSProperties = {
  textTransform: 'uppercase',
}
const partnerDescriptionStyle: React.CSSProperties = {
  borderTop: 10,
  fontSize: 14,
}

const imageStyle: React.CSSProperties = {
  border: `1px solid ${colors.SILVER_THREE}`,
  borderRadius: '50%',
  height: 60,
  width: 60,
}
const buttonsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 0',
  width: '100%',
}
const partnerButtonStyle: React.CSSProperties = {
  width: 145,
}

interface ExternalPartnerProps extends PartnerProps {
  isOpen: boolean
  onSelect: (id: string) => void
}
const ExternalPartner = (props: ExternalPartnerProps): React.ReactElement => {
  const {isOpen, onSelect, partnerId, name, logo, details, description, url} = props

  const {t} = useTranslation()
  const finalPartnerDetailsStyle = {
    display: isOpen ? 'block' : 'none',
    ...partnerDetailsStyle,
  }
  const handleOpen = useCallback((): void => onSelect(partnerId), [partnerId, onSelect])
  const handleChoose = useCallback((): void => {
    window.open(url, '_blank')
  }, [url])


  return <div style={partnerContainerStyle}>
    <div style={partnerHeaderStyle} onClick={handleOpen}>
      <div style={partnerHeaderNameStyle}>{`Partenaire ${name}`}
      </div>
      <div style={partnerHeaderMoreStyle}>
        {isOpen ? '-' : '+'}
      </div>
    </div>
    <div style={finalPartnerDetailsStyle}>
      <div style={partnerTitleStyle}>
        <div style={partnerTitleLogoStyle}>
          <img src={logo} alt="logo" style={imageStyle} />
        </div>
        <div style={partnerTitleNameStyle}>
          <div style={partnerTitleNameNameStyle}>
            {name}
          </div>
          <div style={partnerTitleNameDetailsStyle}>
            {details}
          </div>
        </div>
      </div>
      <div style={partnerDescriptionStyle}>
        <ReactMarkdown source={description} />
      </div>
      <div style={buttonsContainerStyle}>
        <div style={partnerButtonStyle}>
          <a target="_blank" rel="noopener noreferrer" href={url} style={linkStyle}>
            <Button type="variable">{t('Découvrir')}</Button>
          </a>
        </div>
        <div style={partnerButtonStyle}>
          <Link onClick={handleChoose} to={getPath(['STEPS'], t)} style={linkStyle}>
            <Button type="firstLevel">
              {t('Choisir')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
}

export default React.memo(ExternalPartner)
