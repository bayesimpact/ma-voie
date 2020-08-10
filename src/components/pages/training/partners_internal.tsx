import React, {useState} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {Link} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import PartnerCard from 'components/partner_card'
import TabsNav, {TabProps} from 'components/tabs_nav'

import logoJobready from 'images/logo-jobready.png'
import logoGeneration from 'images/logo-generation.png'

const onClick = (): void => window.alert('Bientôt disponible...')

// TODO(émilie): create with the good content
const listItems = [
  prepareT('Durée\u00A0: 6 semaines'),
  prepareT('Faisable en ligne'),
  prepareT('Coach dédié pour vous accompagner'),
  prepareT('Suivi quotidien de votre avancement'),
  prepareT('Disponible 24h/24'),
  prepareT('Ils sont sympas'),
]
const partnerCardStyle: React.CSSProperties = {
  margin: '20px 20px 20px 0',
}
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonWrapperStyle: React.CSSProperties = {
  marginBottom: 55,
  padding: '10px 20px 0',
}
const paragrapheStyle: React.CSSProperties = {
  fontSize: 14,
  padding: '0 20px',
}
const tabs: readonly TabProps[] = [
  {
    redirect: ['TRAINING_PARTNERS_INTERNAL'],
    title: <Trans>Certifiés par Ma Voie</Trans>,
  },
  {
    redirect: ['TRAINING_PARTNERS_EXTERNAL'],
    title: <Trans>Autres partenaires</Trans>,
  },
]

const partners = [
  {
    details: prepareT('Finançable CPF'),
    id: 'job-ready',
    info: prepareT('37 personnes ont choisi Jobready'),
    list: listItems,
    logo: logoJobready,
    onChoose: onClick,
    onDiscover: onClick,
    style: partnerCardStyle,
    title: '300€',
  },
  {
    id: 'generation',
    info: prepareT('37 personnes ont choisi Génération'),
    list: listItems,
    logo: logoGeneration,
    onChoose: onClick,
    onDiscover: onClick,
    style: partnerCardStyle,
    title: prepareT('Gratuit'),
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const TrainingPartnersInternalPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const bigTitle = prepareT('Voici les partenaires idéaux pour vous aider')
  const [position, setPosition] = useState(0)
  const partnersContainerStyle: React.CSSProperties = {
    display: 'flex',
    marginLeft: -335 * position,
    transition: '450ms',
  }
  const onClick = (partnerId: string): void => {
    const partners = document.querySelectorAll('[data-partner]')
    let currentPosition = 0
    for (const partner of partners) {
      if (partner.id === partnerId) {
        setPosition(currentPosition)
        return
      }
      currentPosition++
    }
  }
  // FIXME(émilie): Change link to redirect where it is needed
  // Choisir + Je l'ai fait moi même
  // TODO(émilie): get the right value for "XX personnes ont choisi Chance"
  // TODO(pascal): Fix the slider as it's not easy to get it right in CSS
  return <Layout header={t('Formation')} bigTitle={bigTitle}>
    <TabsNav tabs={tabs} />
    <div style={partnersContainerStyle}>
      {partners.map((partner) =>
        <PartnerCard
          {...partner}
          key={partner.id} partnerId={partner.id}
          onClick={onClick} />,
      )}
    </div>
    <Trans parent="p" style={paragrapheStyle}>
      Si vous pensez avoir déjà réussi cette étape, cliquez sur
      "Je l'ai fait moi-même" pour passer à l'étape suivante.
    </Trans>
    <div style={buttonWrapperStyle}>
      <Link to={getPath(['DEFINITION', 'WHAT'], t)} style={linkStyle}>
        <Button type="specific">
          {t('Je l\'ai fait moi-même')}
        </Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(TrainingPartnersInternalPage)
