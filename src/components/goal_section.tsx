import React, {useCallback, useMemo, useRef} from 'react'
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
      Définir votre <strong style={strongStyle}>projet professionnel</strong>
    </Trans>,
    icon: definitionIcon,
    name: prepareT('définition'),
  },
  {
    color: colors.SILVER,
    content: <Trans parent={null}>
      Analyser vos <strong style={strongStyle}>compétences</strong>
    </Trans>,
    icon: competencesIcon,
    name: prepareT('compétences'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    content: <Trans parent={null}>
      Évaluer vos besoins de <strong style={strongStyle}>formation</strong>
    </Trans>,
    icon: formationIcon,
    name: prepareT('formation'),
  },
  {
    color: colors.PALE_MAUVE,
    content: <Trans parent={null}>
      Vous préparer pour vos <strong style={strongStyle}>entretiens</strong>
    </Trans>,
    icon: valorisationIcon,
    name: prepareT('valorisation'),
  },
]

const isMobileVersion = window.outerWidth <= 800
const cardWidth = 220
const cardPaddingWidth = 30

const sectionStyle: React.CSSProperties = {
  color: colors.GREYISH_TEAL,
  fontSize: 18,
  padding: isMobileVersion ? '0 35px' : '0 20px 60px',
}
const contentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: isMobileVersion ? 'column' : 'row',
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
  margin: '0 -35px',
  overflow: 'scroll',
  padding: '0 0 75px',
  scrollBehavior: 'smooth',
  width: '100vw',
} : {
  flex: 1,
  minWidth: 480,
}
const cardsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: isMobileVersion ? 'nowrap' : 'wrap',
  justifyContent: isMobileVersion ? 'space-between' : 'initial',
  margin: isMobileVersion ? '0' : '-40px 0 70px -40px',
  minWidth: isMobileVersion ? 'initial' : 480,
  padding: isMobileVersion ? `0 calc(50vw - ${cardWidth / 2}px)` : '0',
  width: isMobileVersion ?
    cardWidth * CARDS.length + cardPaddingWidth * (CARDS.length - 1) : 'auto',
}
const presentationStyle: React.CSSProperties = isMobileVersion ? {} : {
  flex: 1,
  maxWidth: 480,
  paddingRight: 90,
  position: 'relative',
}

interface DisplayCardProps extends CardProps {
  index: number
  onClick: (index: number) => void
  style?: React.CSSProperties
}

const CardBase = ({color, content, icon, index, onClick, style}: DisplayCardProps):
React.ReactElement => {
  const cardStyle: React.CSSProperties = useMemo(() => ({
    borderRadius: 20,
    boxShadow: '0 16px 35px 0 rgba(0,0,0,.1)',
    display: 'block',
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
  const handleClick = useCallback((): void => {
    onClick(index)
  }, [index, onClick])
  return <li style={cardStyle} onClick={handleClick}>
    <div style={headerStyle}><img src={icon} alt="" /></div>
    <div style={contentStyle}>
      {content}
      <div style={indexStyle} aria-hidden={true}>{index}</div>
    </div>
  </li>
}
const Card = React.memo(CardBase)


const GoalSection = (): React.ReactElement => {
  const {t} = useTranslation()
  const carouselRef = useRef<HTMLDivElement>(null)
  const scrollToCard = useCallback((index: number): void => {
    carouselRef.current?.scrollTo((index - 1) * (cardWidth + cardPaddingWidth), 0)
  }, [])
  return <section style={sectionStyle}>
    <div style={contentStyle}>
      <div style={presentationStyle}>
        <h2 style={titleStyle}>{t('4 étapes-clés')}</h2>
        <Trans>
          Selon votre situation, les partenaires certifiés
          {' '}<strong style={strongStyle}>$t(productName)</strong>{' '}
          vous accompagnent à chaque étape de votre parcours
        </Trans>
        {isMobileVersion ? null : <img style={arrowsStyle} src={grey6ArrowsImage} alt="" />}
      </div>
      <div style={carouselStyle} ref={carouselRef}>
        <ol style={cardsContainerStyle}>
          {CARDS.map((card, index) => <Card
            key={index} index={index + 1} {...card}
            style={index % 2 ? evenCardOuterStyle : cardOuterStyle} onClick={scrollToCard} />)}
        </ol>
      </div>
    </div>
  </section>
}


export default React.memo(GoalSection)
