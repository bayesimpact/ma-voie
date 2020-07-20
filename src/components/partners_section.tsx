import React from 'react'
import {Trans, useTranslation} from 'react-i18next'

import logoBayes from 'images/logo-bayes.png'
import logoChance from 'images/logo-chance.png'
import logoGeneration from 'images/logo-generation.png'
import logoJobready from 'images/logo-jobready.png'


interface PartnerProps {
  image: string
  name: string
  url: string
}

const PARTNERS = [
  {image: logoChance, name: 'Chance', url: 'https://www.chance.co/'},
  {image: logoBayes, name: 'Bayes Impact', url: 'https://www.bayesimpact.org/fr/'},
  {image: logoGeneration, name: 'Generation', url: 'https://www.jobready.fr/'},
  {image: logoJobready, name: 'Jobready', url: 'https://france.generation.org/'},
]

const partnerCardStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 20,
  display: 'flex',
  height: 99,
  justifyContent: 'center',
  width: 219,
}
const partnerImageStyle: React.CSSProperties = {
  width: 150,
}

const PartnerCardBase = ({image, name, url}: PartnerProps): React.ReactElement => {
  return <a href={url}><div style={partnerCardStyle}>
    <img src={image} alt={name} style={partnerImageStyle} />
  </div></a>
}
const PartnerCard = React.memo(PartnerCardBase)

const textStyle: React.CSSProperties = {
  color: '#fff',
  fontFamily: 'Lato, Helvetica',
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
  return <section style={containerStyle}>
    <div style={{margin: 'auto', maxWidth: 960}}>
      <h1 style={titleStyle}>{t('Nos partenaires')}</h1>
      <Trans style={textStyle}>Ma Voie est une initiative portée par quatre acteurs du
      secteur de l'emploi et de la technologie</Trans>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {PARTNERS.map(
          (partner: PartnerProps, index: number): React.ReactElement => <PartnerCard
            key={index} {...partner} />)}
      </div>
    </div>
  </section>
}


export default React.memo(PartnersSection)
