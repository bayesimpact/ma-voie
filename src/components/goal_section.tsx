import React, {useMemo} from 'react'
import {Trans, useTranslation} from 'react-i18next'

import {colorToAlpha} from 'components/colors'
import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import formationIcon from 'images/formation-ico.svg'
import valorisationIcon from 'images/valorisation-ico.svg'

const safeSidesStyle: React.CSSProperties = {
  padding: '0 20px',
}
const sectionStyle: React.CSSProperties = {
  color: colors.GREYISH_TEAL,
  display: 'flex',
  fontSize: 18,
  margin: '0 auto',
  maxWidth: 960,
}
const titleStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
  fontFamily: 'ProximaSoft',
  fontSize: 47,
  margin: '70px 0 50px',
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
const strongStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
}
const keyStepsStyle: React.CSSProperties = {
  color: colors.TEAL_BLUE,
  fontWeight: 'bold',
}
const firstCardStyle: React.CSSProperties = {
  marginBottom: 40,
}
const secondCardStyle: React.CSSProperties = {
  margin: '70px 0 40px',
}

interface CardProps {
  children: React.ReactNode
  color: string
  icon: string
  index: number
  name: string
  style?: React.CSSProperties
}

const CardBase = ({children, color, icon, index, name, style}: CardProps): React.ReactElement => {
  const cardStyle: React.CSSProperties = useMemo(() => ({
    borderRadius: 20,
    boxShadow: '0 16px 35px 0 rgba(0,0,0,.1)',
    fontSize: 16,
    maxWidth: 220,
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
    padding: 30,
    textAlign: 'center',
  }
  // TODO(cyrille): Add icons.
  return <div style={cardStyle}>
    <header style={headerStyle}><img src={icon} alt={name} /></header>
    <div style={contentStyle}>
      {children}
      <div style={indexStyle}>{index}</div>
    </div>
  </div>
}
const Card = React.memo(CardBase)

// TODO(cyrille): Fix on mobile.
const GoalSection = (): React.ReactElement => {
  const {t} = useTranslation()
  return <div style={safeSidesStyle}>
    <section style={sectionStyle}>
      <div style={{maxWidth: 480, paddingRight: 90}}>
        <h2 style={titleStyle}>{t("C'est quoi\u00A0?")}</h2>
        <Trans>
          Sur la route de l’emploi et en
          ligne, <strong style={strongStyle}>$t(productName)</strong> vous offre un parcours
          personnalisé à vos besoins à travers <span style={keyStepsStyle}>4 étapes clefs</span>
        </Trans>
        {/* TODO(cyrille): Add arrows. */}
      </div>
      <div style={{display: 'flex', minWidth: 480}}>
        <div style={{marginRight: 40}}>
          <Card
            style={firstCardStyle} color={colors.LIGHT_TAN} index={1}
            icon={definitionIcon} name={t('définition')}>
            <Trans parent={null}>
            Une définition de votre <strong style={strongStyle}>projet professionnel</strong>
            </Trans>
          </Card>
          <Card color={colors.LIGHT_SKY_BLUE} index={3} icon={formationIcon} name={t('formation')}>
            <Trans parent={null}>
              Une évaluation de vos besoins de <strong style={strongStyle}>formation</strong>
            </Trans>
          </Card>
        </div>
        <div>
          <Card
            style={secondCardStyle} color={colors.SILVER} index={2}
            icon={competencesIcon} name={t('compétences')}>
            <Trans parent={null}>
              Une analyse de vos <strong style={strongStyle}>compétences</strong>
            </Trans>
          </Card>
          <Card
            color={colors.PALE_MAUVE} index={4} icon={valorisationIcon} name={t('valorisation')}>
            <Trans parent={null}>
              <strong style={strongStyle}>La valorisation</strong> de vos compétences
            </Trans>
          </Card>
        </div>
      </div>
    </section>
  </div>
}


export default React.memo(GoalSection)
