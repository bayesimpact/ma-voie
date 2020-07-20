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
  display: 'flex',
  justifyContent: 'center',
}
// TODO(sil): Fix image size.
const partnerImageStyle: React.CSSProperties = {
  height: 99,
  width: 219,
}

// TODO(sil): Update syling.
const PartnerCardBase = ({image, name, url}: PartnerProps): React.ReactElement => {
  return <div style={partnerCardStyle}>
    <a href={url}><img src={image} alt={name} style={partnerImageStyle} /></a>
  </div>
}
const PartnerCard = React.memo(PartnerCardBase)


// TODO(sil): Update syling.
const PartnersSection = (): React.ReactElement => {
  const {t} = useTranslation()
  return <div>
    <h2>{t('Nos partenaires')}</h2>
    <Trans>{t('productName')} est une initiative portée par quatre acteurs du
    secteur de l'emploi et de la technologie</Trans>
    <div style={{display: 'flex'}}>
      {PARTNERS.map(
        (partner: PartnerProps, index: number): React.ReactElement => <PartnerCard
          key={index} {...partner} />)}
    </div>
  </div>
}


export default React.memo(PartnersSection)
