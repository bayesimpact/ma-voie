import React from 'react'
import {Trans, useTranslation} from 'react-i18next'

import logoBayes from 'images/logo-bayes.png'
import logoChance from 'images/logo-chance.svg'
import logoGeneration from 'images/logo-generation.png'
import logoJobready from 'images/logo-jobready.png'


const isMobileVersion = window.outerWidth < 800


interface PartnerProps {
  image: string
  name: string
  url: string
}

const PARTNERS = [
  {image: logoChance, name: 'Chance', url: 'https://www.chance.co/'},
  {image: logoBayes, name: 'Bayes Impact', url: 'https://www.bayesimpact.org/fr/'},
  {image: logoGeneration, name: 'Generation', url: 'https://france.generation.org/'},
  {image: logoJobready, name: 'Jobready', url: 'https://www.jobready.fr/'},
]

const partnerCardStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 20,
  display: 'flex',
  height: 99,
  justifyContent: 'center',
  marginBottom: isMobileVersion ? 20 : 0,
  width: 219,
}
const partnerImageStyle: React.CSSProperties = {
  width: 150,
}

const PartnerCardBase = ({image, name, url}: PartnerProps): React.ReactElement => {
  return <a href={url} target="_blank" rel="noopener noreferrer"><span style={partnerCardStyle}>
    <img src={image} alt={name} style={partnerImageStyle} />
  </span></a>
}
const PartnerCard = React.memo(PartnerCardBase)

const textStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: 18,
  maxWidth: 465,
  minHeight: 78,
  padding: '30px 0px 40px',
}
const titleStyle: React.CSSProperties = {
  ...textStyle,
  fontFamily: 'ProximaSoft',
  fontSize: 47,
  fontWeight: 'bold',
  margin: 0,
  padding: '80px 0px 0px',
}
const containerStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_TEAL,
  padding: '0px 20px 100px',
}

const PartnersSection = (): React.ReactElement => {
  const {t} = useTranslation()
  const cardsStyle: React.CSSProperties = {
    alignItems: isMobileVersion ? 'center' : 'initial',
    display: 'flex',
    flexDirection: isMobileVersion ? 'column' : 'row',
    justifyContent: isMobileVersion ? 'initial' : 'space-between',
  }
  return <section style={containerStyle}>
    <div style={{margin: 'auto', maxWidth: 960}}>
      <h2 style={titleStyle}>{t('Nos partenaires')}</h2>
      <Trans style={textStyle}>$t(productName) est une initiative portée par quatre acteurs du
      secteur de l'emploi et de la technologie</Trans>
      <div style={cardsStyle}>
        {PARTNERS.map(
          (partner: PartnerProps, index: number): React.ReactElement => <PartnerCard
            key={index} {...partner} />)}
      </div>
    </div>
  </section>
}


export default React.memo(PartnersSection)
