import React from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Footer from 'components/footer'
import logoImage from 'images/logo.svg'
import mission1Image from 'images/mission-img1.jpg'
import mission2Image from 'images/mission-img2.jpg'
import mission3Image from 'images/mission-img3.png'
import mission4Image from 'images/mission-img4.png'

const chapterStyle: React.CSSProperties = {
  fontFamily: 'Lato, Helvetica',
  padding: '55px 20px 100px',
}
const contentStyle: React.CSSProperties = {
  color: colors.BATTLESHIP_GREY,
  fontSize: 18,
  lineHeight: 1.44,
  margin: 'auto',
  maxWidth: 700,
}
const chapterTitleStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontFamily: 'ProximaSoft',
  fontSize: 32,
  fontWeight: 'bold',
  lineHeight: 1.25,
  marginBottom: 20,
}
const subtitleStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
  display: 'block',
  fontWeight: 'bold',
}
const paragraphStyle: React.CSSProperties = {
  color: colors.BATTLESHIP_GREY,
  marginBottom: 20,
  marginTop: 0,
}
const questionStyle: React.CSSProperties = {
  color: colors.BATTLESHIP_GREY,
  fontStyle: 'italic',
  fontWeight: 'bold',
}
const titleSectionStyle: React.CSSProperties = {
  backgroundColor: colors.TURQUOISE_BLUE,
  color: '#fff',
  overflow: 'hidden',
  padding: '150px 20px 190px',
  position: 'relative',
}
const titleStyle: React.CSSProperties = {
  fontSize: 47,
  fontWeight: 'bold',
  margin: '0 auto',
  maxWidth: 700,
  textTransform: 'uppercase',
}
const logoStyle: React.CSSProperties = {
  left: 30,
  margin: 0,
  position: 'absolute',
  top: 30,
}
const whiteTriangleStyle: React.CSSProperties = {
  borderBottom: 'solid #fff 10vw',
  borderLeft: 'solid transparent 100vw',
  bottom: 0,
  left: 0,
  position: 'absolute',
  zIndex: 1,
}
const emphasisStyle: React.CSSProperties = {
  display: 'flex',
  width: '100%',
}
const emphasisSentenceStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: colors.DARK_FOREST_GREEN,
  color: '#fff',
  display: 'flex',
  fontFamily: 'Lato, Helvetica',
  fontSize: 58,
  fontStyle: 'italic',
  marginRight: 10,
  padding: '0 20px',
  textAlign: 'center',
}
const emphasisImageStyle: React.CSSProperties = {
  maxWidth: '50%',
}


// This is a top level page and should be nested only with caution.
// TOP LEVEL PAGE
const MissionPage = (): React.ReactElement => {
  const {t} = useTranslation()
  return <React.Fragment>
    <section style={titleSectionStyle}>
      <Link style={logoStyle} to={getPath(['SPLASH'], t)}>
        <img src={logoImage} alt={t('productName')} />
      </Link>
      <h1 style={titleStyle}>
        {t('Notre mission')}
      </h1>
      <div style={whiteTriangleStyle} />
    </section>
    <section style={chapterStyle}>
      <div style={contentStyle}>
        <h2 style={chapterTitleStyle}>
          {t("Permettre aux jeunes et travailleurs précaires de créer leur chemin vers l'emploi")}
        </h2>
        <img src={mission1Image} alt={t('Travailleur à vélo')}
          style={{height: 250, margin: '46px 0', width: 700}} />
        <div style={subtitleStyle}>
          {t("Proposer le bon service de l'emploi au bon moment pour chaque jeune de 16 à 34 ans")}
        </div>
        <Trans parent="p" style={paragraphStyle}>
          Chercher un emploi aujourd'hui, c'est le parcours du combattant&nbsp;:<br />
          difficile de savoir par où commencer, si l'on a les bonnes compétences,
          comment postuler aux offres, trouver les formations (et si elles sont de qualité),
          réussir les entretiens<br />
          Bref, trop de choix, pas assez de conseils , un manque de réseau ou de soutien
          et le besoin d'être écouté et rassuré.
        </Trans>
        <div style={questionStyle}>{t("Comment passer à l'action dans ce contexte\u00A0?")}</div>
        <Trans parent="p" style={paragraphStyle}>
          L'association $t(productName) est là pour y voir plus clair, en proposant un
          diagnostic personnalisé et des étapes simples à chaque jeune et travailleur précaire
          de 16 à 34 ans.
        </Trans>
      </div>
    </section>

    <div style={emphasisStyle}>
      <Trans parent="div" style={emphasisSentenceStyle}>
       Trouver un job, c'est comme gagner la Coupe du Monde&nbsp;:
       il y a des étapes avant la finale&nbsp;!
      </Trans>
      <img src={mission2Image} style={emphasisImageStyle} alt={t('Femme souriante')} />
    </div>

    <section style={chapterStyle}>
      <div style={contentStyle}>
        <h2 style={chapterTitleStyle}>
          {t("L'union fait l'impact\u00A0: tous unis face au chômage des jeunes")}
        </h2>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '25px 0 45px 0'}}>
          <img src={mission3Image} style={{width: 340}} alt={t('Boulanger')} />
          <img src={mission4Image} style={{width: 340}} alt={t('Collègues')} />
        </div>
        <Trans parent="div" style={subtitleStyle}>
          Une collaboration entre acteurs privés et publics de l'insertion professionnelle,
          au service des jeunes
        </Trans>
        <Trans parent="p" style={paragraphStyle}>
          $t(productName) vise à orienter vers les meilleurs services de l'emploi pour les
          jeunes et travailleurs précaires.<br />
          Service public, acteurs privés, associations, entreprises&nbsp;: ce qui compte, c'est
          qualité du service pour les jeunes et la capacité à donner confiance et
          mettre en action.
        </Trans>
        <Trans parent="p" style={paragraphStyle}>
          L'orientation des jeunes sur $t(productName) est gratuite, tout comme l'offre des
          partenaires mis en avant. Cet accompagnement se fait autour de 4 étapes clés&nbsp;:
          Définition du projet professionnel, Analyse des compétences, Formation métier et
          aux compétences transversales et Préparation aux entretiens.
        </Trans>
      </div>
    </section>
    <Footer />
  </React.Fragment>
}

export default React.memo(MissionPage)
