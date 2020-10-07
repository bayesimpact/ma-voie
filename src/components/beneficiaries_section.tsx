import React from 'react'
import {Trans} from 'react-i18next'

const isMobileVersion = window.outerWidth < 800

const sectionStyle: React.CSSProperties = {
  backgroundImage:
  // 3.2214rad = PI + atan(0.08)
  `linear-gradient(3.2214rad, transparent, transparent 8vw, ${colors.TEAL_BLUE} 8.3vw, ` +
  `${colors.TEAL_BLUE})`,
  color: '#fff',
  overflow: 'hidden',
  padding: isMobileVersion ? '80px 35px 110px' : '120px 20px 100px',
  position: 'relative',
}
const contentStyle: React.CSSProperties = {
  margin: 'auto',
  maxWidth: 960,
  position: 'relative',
}
const tagLineStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  fontSize: isMobileVersion ? 37 : 47,
  fontWeight: 'bold',
  lineHeight: 1.06,
  marginBottom: 50,
}
const blocsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: isMobileVersion ? 'column-reverse' : 'row',
  justifyContent: 'space-between',
}
const blocDescriptionStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 5,
  color: colors.LIGHT_SKY_BLUE,
  fontSize: 18,
  padding: isMobileVersion ? '5px 0' : '0',
  width: isMobileVersion ? '100%' : 481,
}
const textDescriptionStyle: React.CSSProperties = {
  lineHeight: 1.22,
  margin: '35px 34px 30px',
}
const blockDescriptionEmphasisStyle: React.CSSProperties = {
  color: '#fff',
  fontWeight: 'bold',
}
const blocDatesStyle: React.CSSProperties = {
  alignItems: isMobileVersion ? 'center' : 'flex-start',
  display: 'flex',
  fontFamily: 'ProximaSoft',
  height: 94,
  justifyContent: isMobileVersion ? 'space-between' : 'initial',
  paddingBottom: isMobileVersion ? 60 : 0,
  paddingTop: isMobileVersion ? 0 : 15,
}
const blockDatesDayStyle: React.CSSProperties = {
  fontSize: isMobileVersion ? 40 : 47,
  fontWeight: 'bold',
  lineHeight: 1.1,
}
const blocDateStyle: React.CSSProperties = {
  color: colors.DARK_TEAL,
  fontSize: isMobileVersion ? 24 : 32,
  textTransform: 'uppercase',
}
const blocDateSeparatorStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_TEAL,
  borderRadius: 2.5,
  height: '100%',
  margin: isMobileVersion ? '15px 0' : '0 38px',
  width: 3,
}
const BeneficiariesSection = (): React.ReactElement => {
  return <section style={sectionStyle}>
    <div style={contentStyle}>
      <Trans style={tagLineStyle} parent="h2">
        Soyez parmi nos <br />
        100 premiers bénéficiaires
      </Trans>
      <div style={blocsStyle}>
        <div style={blocDescriptionStyle}>
          <Trans style={textDescriptionStyle}>
            <p><span style={blockDescriptionEmphasisStyle}>De septembre à
            octobre 2020</span>, vous pourrez profiter en avant-première
            du lancement de $t(productName).</p>
            <p><span style={blockDescriptionEmphasisStyle}>$t(productName)
            vous choisit</span>&nbsp;: si vous êtes parmi les 100 premiers inscrits,
            demandeur d’emploi ou en reconversion.</p>
            <p><span style={blockDescriptionEmphasisStyle}>$t(productName) vous
            accompagne</span>&nbsp;: sur les quatre étapes clés de votre recherche
            d’emploi grâce à ses partenaires certifiés.</p>
            <p><span style={blockDescriptionEmphasisStyle}>$t(productName) vous
            écoute</span>&nbsp;: votre retour d’expérience contribuera à améliorer
            notre service.</p>
          </Trans>
        </div>
        <div style={blocDatesStyle}>
          <div style={blocDateStyle}>
            <Trans>
              <span style={blockDatesDayStyle}>28</span> <br />
              septembre
            </Trans>
          </div>
          <div style={blocDateSeparatorStyle}>&nbsp;</div>
          <div style={blocDateStyle}>
            <Trans>
              <span style={blockDatesDayStyle}>31</span> <br />
              octobre
            </Trans>
          </div>
        </div>
      </div>
    </div>
  </section>
}


export default React.memo(BeneficiariesSection)
