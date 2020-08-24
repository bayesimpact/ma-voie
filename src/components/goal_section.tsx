import React, {useMemo} from 'react'
import {Trans, useTranslation} from 'react-i18next'

import {prepareT} from 'store/i18n'

import {colorToAlpha} from 'components/colors'
import grey6ArrowsImage from 'images/arrows-6.svg?stroke=#cccece' // colors.SILVER_THREE
import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import formationIcon from 'images/formation-ico.svg'
import valorisationIcon from 'images/valorisation-ico.svg'

const strongStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
}

interface CardProps {
  color: string
  content: React.ReactNode
  icon: string
  name: string
}

const CARDS: readonly (CardProps & {index?: never})[] = [
  {
    color: colors.LIGHT_TAN,
    content: <Trans parent={null}>
      Une définition de votre <strong style={strongStyle}>projet professionnel</strong>
    </Trans>,
    icon: definitionIcon,
    name: prepareT('définition'),
  },
  {
    color: colors.SILVER,
    content: <Trans parent={null}>
      Une analyse de vos <strong style={strongStyle}>compétences</strong>
    </Trans>,
    icon: competencesIcon,
    name: prepareT('compétences'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    content: <Trans parent={null}>
      Une évaluation de vos besoins de <strong style={strongStyle}>formation</strong>
    </Trans>,
    icon: formationIcon,
    name: prepareT('formation'),
  },
  {
    color: colors.PALE_MAUVE,
    content: <Trans parent={null}>
      <strong style={strongStyle}>La valorisation</strong> de vos compétences
    </Trans>,
    icon: valorisationIcon,
    name: prepareT('valorisation'),
  },
]

const isMobileVersion = window.outerWidth <= 800
const cardWidth = 220

const sectionStyle: React.CSSProperties = {
  color: colors.GREYISH_TEAL,
  display: 'flex',
  flexDirection: isMobileVersion ? 'column' : 'row',
  fontSize: 18,
  padding: isMobileVersion ? '0 35px' : '0 20px',
}
const contentStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: 960,
}
const titleStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
  fontFamily: 'ProximaSoft',
  fontSize: isMobileVersion ? 37 : 47,
  margin: isMobileVersion ? '65px 0 35px' : '70px 0 50px',
}
const indexStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: colorToAlpha(colors.TEAL_BLUE, .1),
  borderRadius: 15,
  color: colors.TEAL_BLUE,
  display: 'flex',
  height: 30,
  justifyContent: 'center',
  margin: '30px auto 0',
  width: 30,
}
const keyStepsStyle: React.CSSProperties = {
  color: colors.TEAL_BLUE,
  fontWeight: 'bold',
}
const cardOuterStyle: React.CSSProperties = {
  alignSelf: isMobileVersion ? 'flex-start' : 'stretch',
  marginLeft: isMobileVersion ? 0 : 40,
  marginTop: 40,
}
const evenCardOuterStyle: React.CSSProperties = {
  ...cardOuterStyle,
  ...isMobileVersion ? {alignSelf: 'flex-end'} : {transform: 'translateY(70px)'},
}
const arrowsStyle: React.CSSProperties = {
  bottom: 70,
  left: 0,
  position: 'absolute',
}
const carouselStyle: React.CSSProperties = isMobileVersion ? {
  margin: '0 - 35px',
  overflow: 'scroll',
  padding: '0 0 75px',
  width: '100vw',
} : {}
const cardsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: isMobileVersion ? 'nowrap' : 'wrap',
  justifyContent: isMobileVersion ? 'space-between' : 'initial',
  margin: isMobileVersion ? 'initial' : '-40px 0 70px -40px',
  minWidth: isMobileVersion ? 'initial' : 480,
  padding: isMobileVersion ? `0 calc(50vw - ${cardWidth / 2}px)` : 'initial',
  width: isMobileVersion ? cardWidth * CARDS.length + 30 * (CARDS.length - 1) : 'auto',
}
const presentationStyle: React.CSSProperties = isMobileVersion ? {} : {
  maxWidth: 480,
  paddingRight: 90,
  position: 'relative',
}

interface DisplayCardProps extends CardProps {
  index: number
  style?: React.CSSProperties
}

const CardBase = ({color, content, icon, index, name, style}: DisplayCardProps):
React.ReactElement => {
  const [translate] = useTranslation()
  const cardStyle: React.CSSProperties = useMemo(() => ({
    borderRadius: 20,
    boxShadow: '0 16px 35px 0 rgba(0,0,0,.1)',
    fontSize: 16,
    maxWidth: cardWidth,
    overflow: 'hidden',
    ...style,
  }), [style])
  const headerStyle: React.CSSProperties = {
    alignItems: 'center',
    backgroundColor: color,
    display: 'flex',
    height: 70,
    justifyContent: 'center',
  }
  const contentStyle: React.CSSProperties = {
    minHeight: 100,
    // TODO(cyrille): Find a nicer way to ensure this is always on two lines.
    padding: '30px 29px',
    textAlign: 'center',
  }
  return <div style={cardStyle}>
    <header style={headerStyle}><img src={icon} alt={translate(name)} /></header>
    <div style={contentStyle}>
      {content}
      <div style={indexStyle}>{index}</div>
    </div>
  </div>
}
const Card = React.memo(CardBase)


const GoalSection = (): React.ReactElement => {
  const {t} = useTranslation()
  return <section style={sectionStyle}>
    <div style={contentStyle}>
      <div style={presentationStyle}>
        <h2 style={titleStyle}>{t("C'est quoi\u00A0?")}</h2>
        <Trans>
          Sur la route de l’emploi et en
          ligne, <strong style={strongStyle}>$t(productName)</strong> vous offre un parcours
          personnalisé à vos besoins à travers <span style={keyStepsStyle}>4 étapes clefs</span>
        </Trans>
        {isMobileVersion ? null : <img style={arrowsStyle} src={grey6ArrowsImage} alt="" />}
      </div>
      <div style={carouselStyle}>
        <div style={cardsContainerStyle}>
          {CARDS.map((card, index) => <Card
            key={index} index={index + 1} {...card}
            style={index % 2 ? evenCardOuterStyle : cardOuterStyle} />)}
        </div>
      </div>
    </div>
  </section>
}


export default React.memo(GoalSection)
