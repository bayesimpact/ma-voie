import React from 'react'
import {Trans} from 'react-i18next'

const sectionStyle: React.CSSProperties = {
  backgroundColor: colors.TEAL_BLUE,
  color: '#fff',
  overflow: 'hidden',
  padding: '120px 20px 100px',
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
const whiteTriangleStyle: React.CSSProperties = {
  borderLeft: 'solid transparent 100vw',
  borderTop: 'solid #fff 8vw',
  left: 0,
  position: 'absolute',
  top: 0,
  zIndex: 1,
}
// TODO(Émilie): handle small screens
const blocsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
}
const blocDescriptionStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 5,
  color: colors.LIGHT_SKY_BLUE,
  fontSize: 18,
  width: 481,
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
  display: 'flex',
  fontFamily: 'ProximaSoft',
  height: 94,
  paddingTop: 15,
}
const blockDatesDayStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 47,
  fontWeight: 'bold',
  lineHeight: 1.1,
}
const blocDateStyle: React.CSSProperties = {
  color: colors.DARK_TEAL,
  fontSize: 32,
  textAlign: 'left',
  textTransform: 'uppercase',
}
const blocDateSeparatorStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_TEAL,
  borderRadius: 2.5,
  margin: '0 38px',
  width: 3,
}
const BeneficiariesSection = (): React.ReactElement => {
  return <section style={sectionStyle}>
    <div style={whiteTriangleStyle} />
    <div style={contentStyle}>
      <Trans style={tagLineStyle}>
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
              <span style={blockDatesDayStyle}>20</span>
              septembre
            </Trans>
          </div>
          <div style={blocDateSeparatorStyle}>&nbsp;</div>
          <div style={blocDateStyle}>
            <Trans>
              <span style={blockDatesDayStyle}>27</span>
              novembre
            </Trans>
          </div>
        </div>
      </div>
    </div>
  </section>
}


export default React.memo(BeneficiariesSection)
