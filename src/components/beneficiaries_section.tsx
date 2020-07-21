import React from 'react'
import {Trans} from 'react-i18next'

const isMobileVersion = window.outerWidth < 800

const sectionStyle: React.CSSProperties = {
  backgroundImage:
  // 3.2214rad = PI + atan(0.08)
  `linear-gradient(3.2214rad, transparent, transparent 8vw, ${colors.TEAL_BLUE} 8.1vw, ` +
  `${colors.TEAL_BLUE})`,
  color: '#fff',
  overflow: 'hidden',
  padding: isMobileVersion ? '80px 20px 150px' : '120px 20px 100px',
  position: 'relative',
}
const contentStyle: React.CSSProperties = {
  margin: 'auto',
  maxWidth: 960,
  position: 'relative',
}
const tagLineStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  fontSize: 47,
  fontWeight: 'bold',
  lineHeight: 1.06,
  marginBottom: 50,
}
const blocsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: isMobileVersion ? 'column' : 'row',
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
  flexDirection: isMobileVersion ? 'column' : 'row',
  fontFamily: 'ProximaSoft',
  height: 94,
  paddingTop: 15,
  textAlign: isMobileVersion ? 'center' : 'left',
}
const blockDatesDayStyle: React.CSSProperties = {
  fontSize: 47,
  fontWeight: 'bold',
  lineHeight: 1.1,
}
const blocDateStyle: React.CSSProperties = {
  color: colors.DARK_TEAL,
  fontSize: 32,
  textAlign: isMobileVersion ? 'center' : 'left',
  textTransform: 'uppercase',
}
const blocDateSeparatorStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_TEAL,
  borderRadius: 2.5,
  height: isMobileVersion ? 3 : '100%',
  margin: isMobileVersion ? '15px 0' : '0 38px',
  width: isMobileVersion ? '15%' : 3,
}
const BeneficiariesSection = (): React.ReactElement => {
  return <section style={sectionStyle}>
    <div style={contentStyle}>
      <Trans style={tagLineStyle} parent="h2">
        On cherche nos<br />
        100 premiers bénéficiaires
      </Trans>
      <div style={blocsStyle}>
        <div style={blocDescriptionStyle}>
          <Trans style={textDescriptionStyle}>
            <p><span style={blockDescriptionEmphasisStyle}>De septembre à
            novembre 2020</span>, lorsque les
            conséquences de la crise seront encore plus visibles,
            100 personnes - dont vous ferez peut-être partie -
            pourront profiter du lancement de $t(productName).</p>
            <p>$t(productName) invitera par ailleurs ces premières personnes
            inscrites à participer à l'amélioration du parcours.</p>
            <p><span style={blockDescriptionEmphasisStyle}>Vous serez
            accompagné</span> tout au long du parcours
            par les services d'appui les plus adaptés à votre
            situation et à vos besoins.</p>
          </Trans>
        </div>
        <div style={blocDatesStyle}>
          <div style={blocDateStyle}>
            <Trans>
              <span style={blockDatesDayStyle}>20</span><br />
              septembre
            </Trans>
          </div>
          <div style={blocDateSeparatorStyle}>&nbsp;</div>
          <div style={blocDateStyle}>
            <Trans>
              <span style={blockDatesDayStyle}>27</span><br />
              novembre
            </Trans>
          </div>
        </div>
      </div>
    </div>
  </section>
}


export default React.memo(BeneficiariesSection)
