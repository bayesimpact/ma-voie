import React from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {Link} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import PartnerCard from 'components/partner_card'
import TabsNav, {TabProps} from 'components/tabs_nav'

import logoChance from 'images/logo-chance.svg'

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
    redirect: 'DEFINITION_PARTNERS_INTERNAL',
    title: <Trans>Certifiés par Ma Voie</Trans>,
  },
  {
    redirect: 'DEFINITION_PARTNERS_EXTERNAL',
    title: <Trans>Autres partenaires</Trans>,
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const DefinitionPartnersInternalPage = (): React.ReactElement => {
  const [t] = useTranslation()
  const bigTitle = prepareT('Voici les partenaires idéaux pour vous aider')

  // FIXME(émilie): Change link to redirect where it is needed
  // Choisir + Je l'ai fait moi même
  // TODO(émilie): get the right value for "XX personnes ont choisi Chance"
  return <Layout header={t('Définition')} bigTitle={bigTitle}>
    <TabsNav tabs={tabs} />
    <PartnerCard
      logo={logoChance}
      title="300€"
      details={t('Finançable CPF')}
      info={t('37 personnes ont choisi Chance')}
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
