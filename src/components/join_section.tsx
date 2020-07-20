import React from 'react'
import {Trans, useTranslation} from 'react-i18next'



interface JoinCardProps {
  text: string
  style: React.CSSProperties
}
const buttonStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_FOREST_GREEN,
  borderRadius: 25,
  color: '#fff',
  fontFamily: 'ProximaSoft',
  fontWeight: 'bold',
  padding: '14px 42px',
  textAlign: 'center',
  width: 255,
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
  const containerStyle = {
    alignItems: 'center',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: 228,
    justifyContent: 'center',
    width: 466,
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
  padding: '70px 0px 40px',
  margin: 0,
}
const serviceStyle: React.CSSProperties = {
  backgroundColor: colors.REDDISH_ORANGE,
  marginRight: 29,
}

const supportStyle: React.CSSProperties = {
  backgroundColor: colors.TEAL_BLUE,
}
const sectionStyle: React.CSSProperties = {
  padding: '70px 0px 100px',
}
const JoinSection = (): React.ReactElement => {
  const {t} = useTranslation()
  const support_text = <Trans>
    <strong>Vous proposez un service d’accompagnement</strong><br />
    et souhaitez être référencé sur {t('productName')}
  </Trans>
  const service_text = <Trans>
    Vous souhaitez soutenir {t('productName')}<br />
    <strong>Envoyez-nous un message</strong>
  </Trans>

  // TODO(sil): Add a mailto.
  return <section style={sectionStyle}>
    <div style={{margin: 'auto', maxWidth: 960}}>
      <h2 style={titleStyle}>{t('Vous souhaitez nous rejoindre\u00A0?')}</h2>
      <div style={{display: 'flex'}}>
        <JoinCard text={service_text} style={serviceStyle} />
        <JoinCard text={support_text} style={supportStyle} />
      </div>
    </div>
  </section>
}


export default React.memo(JoinSection)
