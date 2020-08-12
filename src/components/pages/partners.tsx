import React, {useCallback, useMemo, useState} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {useLocation, useRouteMatch} from 'react-router'
import {Link, Redirect} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import {STEPS, StepId, StepInfo} from 'components/pages/steps'
import ExternalPartner from 'components/external_partner'
import PartnerCard, {PartnerProps} from 'components/partner_card'
import TabsNav, {TabProps} from 'components/tabs_nav'

// TODO(émilie): create with the good content
const description = `
  * Durée\u00A0: 6 semaines
  * Faisable en ligne
  * Coach dédié pour vous accompagner
  * Suivi quotidien de votre avancement
  * Disponible 24h/24
  * Ils sont sympas
`

const externalDescription = `Ce cours en ligne* "Focus compétences" est composé de 4 séquences :

1. Définir la notion de compétence

2. Acquérir une méthodologie pour identifier ses compétences

3. Valoriser ses compétences auprès d'un recruteur

4. Augmenter sa visibilité et sa crédibilité sur les réseaux sociaux

Chaque séquence est composée de vidéos, quiz, et de ressources complémentaires**.
Vous pouvez suivre chaque séquence à votre rythme et selon vos besoins.`


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

type SelectablePartner = PartnerProps & {isInternal?: boolean; steps: readonly StepId[]}

// TODO(cyrille): Fetch from a JSON file.
const PARTNERS: readonly SelectablePartner[] = ([
  {
    description,
    details: prepareT('Finançable CPF'),
    discoverUrl: 'https://www.chance.co/fr/parcours',
    isInternal: true,
    logo: 'chance.svg',
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
    isInternal: true,
    logo: 'jobready.png',
    name: 'Jobready',
    partnerId: 'job-ready',
    steps: ['training'],
    title: '300€',
    url: 'https://www.jobready.fr',
  },
  {
    description,
    isInternal: true,
    logo: 'generation.png',
    name: 'Génération',
    partnerId: 'generation',
    steps: ['training'],
    title: prepareT('Gratuit'),
    url: 'https://france.generation.org',
    userCount: 1,
  },
  {
    description: externalDescription,
    details: 'MOOC',
    logo: 'chance.svg',
    name: 'Externe 1',
    partnerId: 'chance-1',
    steps: ['definition', 'training'],
    url: '',
  },
  {
    description: externalDescription,
    details: 'MOOC',
    logo: 'chance.svg',
    name: 'Externe 2',
    partnerId: 'chance-2',
    steps: ['definition', 'training'],
    url: '',
  },
] as readonly SelectablePartner[]).map(({logo, ...partner}) => ({
  ...partner,
  // Add logos in the /assets/logo folder when adding new ones.
  logo: `${config.canonicalUrl}/assets/logo/${logo}`,
}))

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const PartnersPage = (): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const {url} = useRouteMatch('/:step') || {}
  const {pathname} = useLocation()
  const [currentPartner, setCurrentPartner] = useState<null|string>(null)
  const onSelect = useCallback((partnerId: string) =>
    setCurrentPartner(previousPartnerId => partnerId === previousPartnerId ? null : partnerId),
  [])
  const {page, title = '', shortTitle = title, stepId}: Partial<StepInfo> =
    STEPS.find(({page}) => getPath(page, t) === url) || {}
  const tabs = useMemo(() => TABS_WITHOUT_STEP.map(({redirect, ...tab}) => ({
    ...tab,
    redirect: [...page || [], ...redirect],
  })), [page])
  const areInternalShown = pathname.endsWith(getPath(['PARTNERS_INTERNAL'], t))
  if (!url || !stepId) {
    return <Redirect to={getPath([], t)} />
  }
  const partners = PARTNERS.filter(({isInternal, steps}) => steps.includes(stepId) &&
    !isInternal === !areInternalShown)
  const position = Math.max(
    0, partners.findIndex(({partnerId}) => currentPartner === partnerId))
  const partnersContainerStyle: React.CSSProperties = {
    display: 'flex',
    marginLeft: -335 * position,
    transition: '450ms',
  }
  const bigTitle = prepareT('Voici les partenaires idéaux pour vous aider')
  // FIXME(émilie): Change link to redirect where it is needed for
  //   "Je l'ai fait moi même"
  // TODO(émilie): get the right value for "XX personnes ont choisi Chance"
  // TODO(pascal): Fix the slider as it's not easy to get it right in CSS
  return <Layout header={translate(shortTitle)} bigTitle={bigTitle}>
    <TabsNav tabs={tabs} />
    {areInternalShown ? <div style={partnersContainerStyle}>
      {partners.map((partner) =>
        <PartnerCard
          key={partner.partnerId} {...partner}
          style={partnerCardStyle} onClick={setCurrentPartner} />,
      )}
    </div> : partners.map((partner) => <ExternalPartner
      key={partner.partnerId} {...partner}
      isOpen={currentPartner === partner.partnerId} onSelect={onSelect} />)}
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

export default React.memo(PartnersPage)
