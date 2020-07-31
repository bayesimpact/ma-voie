import React from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {Link} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {Page, getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import PartnerCard from 'components/partner_card'
import Tab from 'components/tab'

import logoChance from 'images/logo-chance.svg'

const onClick = (): void => window.alert('Bientôt disponible...')

const listItems = [
  'Durée : 6 semaines',
  'Faisable en ligne',
  'Coach dédié pour vous accompagner',
  'Suivi quotidien de votre avancement',
  'Disponible 24h/24',
  'Ils sont sympas',
]

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonWrapperStyle: React.CSSProperties = {
  padding: '10px 20px 0',
}
const paragrapheStyle: React.CSSProperties = {
  fontSize: 14,
  padding: '0 20px',
}

interface TabsProps {
  redirect: Page
  text: JSX.Element
}
const tabs: TabsProps[] = [
  {
    redirect: 'DEFINITION_PARTNERS_INTERNAL',
    text: <Trans>Certifiés par Ma Voie</Trans>,
  },
  {
    redirect: 'DEFINITION_PARTNERS_EXTERNAL',
    text: <Trans>Autres partenaires</Trans>,
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const DefinitionPartnersInternalPage = (): React.ReactElement => {
  const [t] = useTranslation()
  const bigTitle = prepareT('Voici les partenaires idéaux pour vous aider')

  // FIXME(émilie): Change link to redirect where it is needed
  // Choisir + Je l'ai fait moi même
  return <Layout header={t('Définition')} bigTitle={bigTitle}>
    <Tab tabs={tabs} selectedTab={0} />
    <PartnerCard
      logo={logoChance}
      title="300€"
      details="Finançable CPF"
      info="37 personnes ont choisi Chance"
      onClick={onClick}
      list={listItems}
    />
    <Trans parent="p" style={paragrapheStyle}>
      Si vous pensez avoir déjà réussi cette étape, cliquez sur
      "Je l'ai fait moi-même" pour passer à l'étape suivante.
    </Trans>
    <div style={buttonWrapperStyle}>
      <Link to={getPath('DEFINITION_WHAT', t)} style={linkStyle}>
        <Button color={colors.TURQUOISE_BLUE}>
          {t('Je l\'ai fait moi-même')}
        </Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(DefinitionPartnersInternalPage)
