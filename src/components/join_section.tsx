import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'


const isMobileVersion = window.outerWidth < 800

interface JoinCardProps {
  topic: string
  text: React.ReactElement
  style: React.CSSProperties
}
const buttonStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_FOREST_GREEN,
  borderRadius: 25,
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'ProximaSoft',
  fontSize: 18,
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

const JoinCardBase = ({topic, text, style}: JoinCardProps): React.ReactElement => {
  const {t} = useTranslation()
  const containerStyle: React.CSSProperties = {
    alignItems: 'center',
    borderRadius: 20,
    boxSizing: 'border-box',
    display: 'flex',
    ...isMobileVersion ? {} : {flex: 1},
    flexDirection: 'column',
    fontSize: 17,
    height: 228,
    justifyContent: 'center',
    maxWidth: 466,
    padding: isMobileVersion ? '20px 15px' : '50px 40px',
    ...style,
  }
  const handleClick = useCallback((): void => {
    window.open(
      `mailto:?to=${config.contactEmail}&subject=${topic}&`, '_blank', 'noopener,noreferrer')
  }, [topic])
  return <div style={containerStyle}>
    <div style={textStyle}>{text}</div>
    <div style={buttonStyle} onClick={handleClick} role="link">
      {t('contactEmail')}
    </div>
  </div>
}
const JoinCard = React.memo(JoinCardBase)


const titleStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontFamily: 'ProximaSoft',
  fontSize: isMobileVersion ? 37 : 47,
  fontWeight: 'bold',
  lineHeight: isMobileVersion ? 1 : 'initial',
  margin: 0,
  padding: isMobileVersion ? '0 0 60px' : '0 0 40px',
}
const serviceStyle: React.CSSProperties = {
  backgroundColor: colors.REDDISH_ORANGE,
  marginBottom: isMobileVersion ? 40 : 0,
  marginRight: isMobileVersion ? 0 : 29,
}

const supportStyle: React.CSSProperties = {
  backgroundColor: colors.TEAL_BLUE,
}
const sectionStyle: React.CSSProperties = {
  padding: isMobileVersion ? '70px 35px 100px' : '70px 20px 100px',
}
const JoinSection = (): React.ReactElement => {
  const {t} = useTranslation()
  const serviceText = <Trans>
    <strong>Vous proposez un service d’accompagnement</strong> <br />
    et souhaitez être référencé sur <strong>$t(productName)</strong>&nbsp;?
  </Trans>
  const supportText = <Trans>
    Vous souhaitez soutenir <strong>$t(productName)</strong> <br />
    <strong>Envoyez-nous un message</strong>
  </Trans>

  return <section style={sectionStyle}>
    <div style={{margin: 'auto', maxWidth: 960}}>
      <h2 style={titleStyle}>{t('Vous souhaitez nous rejoindre\u00A0?')}</h2>
      <div style={{display: 'flex', flexDirection: isMobileVersion ? 'column' : 'row'}}>
        <JoinCard
          topic={t('Je souhaite être référencé sur $t(productName)')} text={serviceText}
          style={serviceStyle} />
        <JoinCard
          topic={t('Je soutiens $t(productName)')} text={supportText} style={supportStyle} />
      </div>
    </div>
  </section>
}


export default React.memo(JoinSection)
