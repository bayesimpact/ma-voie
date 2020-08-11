import React, {useMemo, useState} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {useRouteMatch} from 'react-router'
import {Link, Redirect} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import {STEPS, StepId, StepInfo} from 'components/pages/steps'
import PartnerCard, {PartnerProps} from 'components/partner_card'
import TabsNav, {TabProps} from 'components/tabs_nav'

import logoChance from 'images/logo-chance.svg'
import logoJobready from 'images/logo-jobready.png'
import logoGeneration from 'images/logo-generation.png'

// TODO(émilie): create with the good content
const description = `
  * Durée\u00A0: 6 semaines
  * Faisable en ligne
  * Coach dédié pour vous accompagner
  * Suivi quotidien de votre avancement
  * Disponible 24h/24
  * Ils sont sympas
`
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
const TABS_WITHOUT_STEP: readonly TabProps[] = [
  {
    redirect: ['PARTNERS_INTERNAL'],
    title: <Trans>Certifiés par Ma Voie</Trans>,
  },
  {
    redirect: ['PARTNERS_EXTERNAL'],
    title: <Trans>Autres partenaires</Trans>,
  },
]

type SelectablePartner = PartnerProps & {steps: readonly StepId[]}

// TODO(cyrille): Fetch from a JSON file.
const PARTNERS: readonly SelectablePartner[] = [
  {
    description,
    details: prepareT('Finançable CPF'),
    discoverUrl: 'https://www.chance.co/fr/parcours',
    logo: logoChance,
    name: 'Chance',
    partnerId: 'chance',
    steps: ['definition'],
    title: '300€',
    url: 'https://www.chance.co',
    userCount: 37,
  },
  {
    description,
    details: prepareT('Finançable CPF'),
    logo: logoJobready,
    name: 'Jobready',
    partnerId: 'job-ready',
    steps: ['training'],
    title: '300€',
    url: 'https://www.jobready.fr',
  },
  {
    description,
    logo: logoGeneration,
    name: 'Génération',
    partnerId: 'generation',
    steps: ['training'],
    title: prepareT('Gratuit'),
    url: 'https://france.generation.org',
    userCount: 1,
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const PartnersInternalPage = (): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const {url} = useRouteMatch('/:step') || {}
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
  const {page, title = '', shortTitle = title, stepId}: Partial<StepInfo> =
    STEPS.find(({page}) => getPath(page, t) === url) || {}
  const tabs = useMemo(() => TABS_WITHOUT_STEP.map(({redirect, ...tab}) => ({
    ...tab,
    redirect: [...page || [], ...redirect],
  })), [page])
  if (!url || !stepId) {
    return <Redirect to={getPath([], t)} />
  }
  const partners = PARTNERS.filter(({steps}) => steps.includes(stepId))
  const bigTitle = prepareT('Voici les partenaires idéaux pour vous aider')
  // FIXME(émilie): Change link to redirect where it is needed for
  //   "Je l'ai fait moi même"
  // TODO(émilie): get the right value for "XX personnes ont choisi Chance"
  // TODO(pascal): Fix the slider as it's not easy to get it right in CSS
  return <Layout header={translate(shortTitle)} bigTitle={bigTitle}>
    <TabsNav tabs={tabs} />
    <div style={partnersContainerStyle}>
      {partners.map((partner) =>
        <PartnerCard
          {...partner} style={partnerCardStyle} key={partner.partnerId} onClick={onClick} />,
      )}
    </div>
    <Trans parent="p" style={paragrapheStyle}>
      Si vous pensez avoir déjà réussi cette étape, cliquez sur
      "Je l'ai fait moi-même" pour passer à l'étape suivante.
    </Trans>
    <div style={buttonWrapperStyle}>
      <Link to={getPath(['STEPS'], t)} style={linkStyle}>
        <Button type="specific">
          {t('Je l\'ai fait moi-même')}
        </Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(PartnersInternalPage)
