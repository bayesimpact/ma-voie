import React, {useMemo, useState} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {useRouteMatch} from 'react-router'
import {Link, Redirect} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import {STEPS, StepInfo} from 'components/pages/steps'
import PartnerCard from 'components/partner_card'
import TabsNav, {TabProps} from 'components/tabs_nav'

import logoChance from 'images/logo-chance.svg'
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

// TODO(cyrille): Fetch from a JSON file.
const PARTNERS = [
  {
    details: prepareT('Finançable CPF'),
    id: 'chance',
    info: prepareT('37 personnes ont choisi Chance'),
    list: listItems,
    logo: logoChance,
    onChoose: onClick,
    onDiscover: onClick,
    steps: ['definition'],
    title: '300€',
  },
  {
    details: prepareT('Finançable CPF'),
    id: 'job-ready',
    info: prepareT('37 personnes ont choisi Jobready'),
    list: listItems,
    logo: logoJobready,
    onChoose: onClick,
    onDiscover: onClick,
    steps: ['training'],
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
    steps: ['training'],
    style: partnerCardStyle,
    title: prepareT('Gratuit'),
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
  // FIXME(émilie): Change link to redirect where it is needed
  // Choisir + Je l'ai fait moi même
  // TODO(émilie): get the right value for "XX personnes ont choisi Chance"
  // TODO(pascal): Fix the slider as it's not easy to get it right in CSS
  return <Layout header={translate(shortTitle)} bigTitle={bigTitle}>
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
      <Link to={getPath(['STEPS'], t)} style={linkStyle}>
        <Button type="specific">
          {t('Je l\'ai fait moi-même')}
        </Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(PartnersInternalPage)
