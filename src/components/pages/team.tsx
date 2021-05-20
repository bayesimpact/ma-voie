import LinkedinIcon from 'mdi-react/LinkedinIcon'
import TwitterIcon from 'mdi-react/TwitterIcon'
import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'

import Button from 'components/button'
import Footer from 'components/footer'
import PartnersSection from 'components/partners_section'
import orange13ArrowsImage from 'images/arrows-13.svg?stroke=#992f00'
import logoImage from 'images/logo.svg'
import celesteImage from 'images/celeste.jpg'
import yifsinImage from 'images/yifsin.jpg'
import mejdaImage from 'images/mejda.jpg'
import philippeImage from 'images/philippe.png'


const chapterStyle: React.CSSProperties = {
  fontFamily: 'Lato, Helvetica',
  padding: '25px 20px 25px',
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
const titleSectionStyle: React.CSSProperties = {
  backgroundColor: colors.REDDISH_ORANGE,
  color: '#fff',
  overflow: 'hidden',
  padding: '150px 20px 190px',
  position: 'relative',
}
const arrowsStyle: React.CSSProperties = {
  position: 'absolute',
  right: 6,
  top: 65,
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

const cardsContainerStyle: React.CSSProperties = {
  alignItems: 'stretch',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}
const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 10,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,.2)',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 20,
  padding: '20px 20px 15px',
  width: 330,
}
const cardImageBaseStyle: React.CSSProperties = {
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: 5,
  height: 180,
}
const cardNameStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 18,
  fontWeight: 'bold',
  lineHeight: '26px',
  margin: '30px 0 3px',
  textTransform: 'uppercase',
}
const cardRoleStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
  fontSize: 18,
  lineHeight: '26px',
  textTransform: 'uppercase',
}
const cardDescriptionStyle: React.CSSProperties = {
  borderBottom: `1px solid ${colors.WHITE_TWO}`,
  color: colors.BATTLESHIP_GREY,
  fontSize: 15,
  lineHeight: '21px',
  paddingBottom: 10,
}
const cardNetworkStyle: React.CSSProperties = {
  alignItems: 'flex-end',
  color: colors.DARK_FOREST_GREEN,
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  textAlign: 'right',
}
const networkLinkStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
}

const PEOPLE = [{
  description: prepareT("Après 10 ans dans l'écosystème start-up et l'économie sociale" +
    ' et solidaire, Philippe a pris la direction de {{productName}}.'),
  dream: prepareT("Son rêve\u00A0? Donner les codes de la recherche d'emploi à tous, " +
    'gratuitement.'),
  id: 'philippe',
  image: philippeImage,
  linkedin: 'https://www.linkedin.com/in/philippedupayrat/',
  name: 'Philippe',
  role: prepareT('Délégué général'),
  twitter: 'https://twitter.com/mavoie_org/',
},
{
  description: prepareT("Fort d'un parcours dans l'événementiel sportif, judoka et agent" +
    " de foot, Yifsin a rejoint {{productName}} pour motiver les jeunes à passer à l'action."),
  dream: prepareT('Son rêve\u00A0? Plus un seul jeune laissé de côté.'),
  id: 'yifsin',
  image: yifsinImage,
  linkedin: 'https://www.linkedin.com/in/yifsin-nouar-571137187/',
  name: 'Yifsin',
  role: prepareT('Customer success manager'),
  twitter: 'https://twitter.com/mavoie_org/',
},
{
  description: prepareT("Passionnée par l'univers des réseaux sociaux depuis l'époque de l'ADSL," +
    ' Mejda a pour ambition de nouer le dialogue avec les jeunes là où ils sont\u00A0: Facebook, ' +
    'Instagram, Twitter, Linkedin et même TikTok.'),
  dream: prepareT('Son rêve\u00A0? Réduire les inégalités des chances en donnant les clés ' +
    'à chaque jeune.'),
  id: 'mejda',
  image: mejdaImage,
  linkedin: 'https://www.linkedin.com/company/mavoie-org',
  name: 'Mejda',
  role: prepareT('Community manager'),
  twitter: 'https://twitter.com/mavoie_org/',
},
{
  description: prepareT('Avec un parcours atypique et engagé, Celeste a découvert le Produit ' +
    "et c'était le coup de foudre. Parce que construire un produit c'est aller rencontrer ceux " +
    ' qui le recherchent, tester des idées, se tromper, en trouver des meilleures avec eux.'),
  dream: prepareT('Son rêve\u00A0? Créer un service qui soit accessible, égalitaire, respectueux ' +
    'des histoires et des parcours de tous.'),
  id: 'celeste',
  image: celesteImage,
  linkedin: 'https://www.linkedin.com/company/mavoie-org',
  name: 'Céleste',
  role: prepareT('Product manager'),
  twitter: 'https://twitter.com/mavoie_org/',
},
] as const


// This is a top level page and should be nested only with caution.
// TOP LEVEL PAGE
const TeamPage = (): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const handleContact = useCallback((): void => {
    window.open(
      `mailto:?to=${config.contactEmail}&subject=Probono&`, '_blank', 'noopener,noreferrer')
  }, [])
  return <React.Fragment>
    <section style={titleSectionStyle}>
      <img src={orange13ArrowsImage} style={arrowsStyle} alt="" />
      <Link style={logoStyle} to={getPath(['SPLASH'], t)}>
        <img src={logoImage} alt={t('productName')} />
      </Link>
      <h1 style={titleStyle}>
        {t('Notre équipe')}
      </h1>
      <div style={whiteTriangleStyle} />
    </section>

    <section style={chapterStyle}>
      <div style={contentStyle}>
        <Trans parent="p">
            $t(productName) est une association <strong>et</strong> start-up
            tech centrée sur l'emploi des jeunes.
        </Trans>
        <Trans parent="p">
            Pour atteindre ses objectifs ambitieux, l'association recrute des talents uniques,
            prêts à s'engager chaque jour pour une société plus inclusive et juste.
        </Trans>
        <div style={cardsContainerStyle}>
          {PEOPLE.map((people) => {
            const cardImageStyle: React.CSSProperties = {
              ...cardImageBaseStyle,
              backgroundImage: `url(${people.image})`,
            }
            return <div key={people.id} style={cardStyle}>
              <div style={cardImageStyle} />
              <div style={cardNameStyle}>{people.name}</div>
              <div style={cardRoleStyle}>{people.role}</div>
              <p style={cardDescriptionStyle}>
                {translate(people.description, {productName: t('productName')})}<br />{people.dream}
              </p>
              <div style={cardNetworkStyle}>
                <a href={people.linkedin} style={networkLinkStyle}><LinkedinIcon /></a>
                <a href={people.twitter} style={networkLinkStyle}><TwitterIcon /></a>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>

    <section style={chapterStyle}>
      <div style={contentStyle}>
        <h2 style={chapterTitleStyle}>
          {t('Rejoignez $t(productName)\u00A0!')}
        </h2>
        <Trans parent="p">
        Vous souhaitez prouver que face au défi de l'emploi, des solutions et collaborations
        innovantes existent&nbsp;?
        </Trans>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
          <a href="https://www.linkedin.com/company/mavoie-org/jobs" style={{textDecoration: 'none', width: 330}}>
            <Button type="feedback">
              {t("Voir nos offres d'emploi")}
            </Button>
          </a>
          <Button type="firstLevel" onClick={handleContact} style={{width: 330}}>
            {t('Pro bono')}
          </Button>
        </div>
      </div>
    </section>
    <PartnersSection isCentered={true} hideFoundersTitle={true} />
    <Footer />
  </React.Fragment>
}


export default React.memo(TeamPage)
