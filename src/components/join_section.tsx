import React from 'react'
import {Trans, useTranslation} from 'react-i18next'


// TODO(sil): Import Lato bold instead of semi-bold.
const isMobileVersion = window.outerWidth < 800

interface JoinCardProps {
  text: React.ReactElement
  style: React.CSSProperties
}
const buttonStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_FOREST_GREEN,
  borderRadius: 25,
  color: '#fff',
  fontFamily: 'ProximaSoft',
  fontWeight: 'bold',
  maxWidth: 255,
  padding: '14px 42px',
  textAlign: 'center',
}
const textStyle: React.CSSProperties = {
  color: '#fff',
  fontFamily: 'Lato, Helvetica',
  maxWidth: 387,
  paddingBottom: 35,
  textAlign: 'center',
}

const JoinCardBase = ({text, style}: JoinCardProps): React.ReactElement => {
  const {t} = useTranslation()
  const containerStyle: React.CSSProperties = {
    alignItems: 'center',
    borderRadius: 20,
    boxSizing: 'border-box',
    display: 'flex',
    ...isMobileVersion ? {} : {flex: 1},
    flexDirection: 'column',
    height: 228,
    justifyContent: 'center',
    maxWidth: 466,
    padding: isMobileVersion ? '20px 15px' : '50px 40px',
    ...style,
  }
  return <div style={containerStyle}>
    <div style={textStyle}>{text}</div>
    <div style={buttonStyle}>
      {t('contactEmail')}
    </div>
  </div>
}
const JoinCard = React.memo(JoinCardBase)


const titleStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontFamily: 'ProximaSoft',
  fontSize: 47,
  fontWeight: 'bold',
  margin: 0,
  padding: '0px 0px 40px',
}
const serviceStyle: React.CSSProperties = {
  backgroundColor: colors.REDDISH_ORANGE,
  marginBottom: isMobileVersion ? 20 : 0,
  marginRight: isMobileVersion ? 0 : 29,
}

const supportStyle: React.CSSProperties = {
  backgroundColor: colors.TEAL_BLUE,
}
const sectionStyle: React.CSSProperties = {
  padding: '70px 20px 100px',
}
const JoinSection = (): React.ReactElement => {
  const {t} = useTranslation()
  const serviceText = <Trans>
    <strong>Vous proposez un service d’accompagnement</strong><br />
    et souhaitez être référencé sur $t(productName)
  </Trans>
  const supportText = <Trans>
    Vous souhaitez soutenir $t(productName)<br />
    <strong>Envoyez-nous un message</strong>
  </Trans>

  // TODO(sil): Add a mailto.
  return <section style={sectionStyle}>
    <div style={{margin: 'auto', maxWidth: 960}}>
      <h2 style={titleStyle}>{t('Vous souhaitez nous rejoindre\u00A0?')}</h2>
      <div style={{display: 'flex', flexDirection: isMobileVersion ? 'column' : 'row'}}>
        <JoinCard text={serviceText} style={serviceStyle} />
        <JoinCard text={supportText} style={supportStyle} />
      </div>
    </div>
  </section>
}


export default React.memo(JoinSection)
