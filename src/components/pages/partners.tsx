import React, {useCallback, useMemo, useRef, useState} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {useLocation, useRouteMatch} from 'react-router'
import {Redirect} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'
import Partners from 'store/partners'

import Layout from 'components/layout'
import {STEPS, StepInfo} from 'components/pages/steps'
import ExternalPartner from 'components/external_partner'
import PartnerCard from 'components/partner_card'
import StepValidationButton from 'components/step_validation_button'
import TabsNav, {TabProps} from 'components/tabs_nav'


const partnerCardStyle: React.CSSProperties = {
  margin: '20px 20px 20px 0',
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
  const partners = stepId && Partners.filter(({isInternal, steps}) => steps.includes(stepId) &&
    !isInternal === !areInternalShown)
  const partnersContainerRef = useRef<HTMLDivElement>(null)
  const scrollToPartner = useCallback((currentPartner: string): void => {
    if (!partners) {
      return
    }
    const position = Math.max(
      0, partners.findIndex(({partnerId}) => currentPartner === partnerId))
    partnersContainerRef.current?.scrollTo(335 * position, 0)
  }, [partners])
  if (!url || !stepId || !partners) {
    return <Redirect to={getPath([], t)} />
  }
  // Extra padding addeded by a wrapper div in the Layout.
  const outerPadding = 30
  const partnersContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    margin: `0 ${-outerPadding}px`,
    overflow: 'scroll',
    scrollBehavior: 'smooth',
    width: '100vw',
  }
  const bigTitle = prepareT('Voici les partenaires idéaux pour vous aider')
  return <Layout header={translate(shortTitle)} bigTitle={bigTitle}>
    <TabsNav tabs={tabs} />
    {areInternalShown ? <div style={partnersContainerStyle} ref={partnersContainerRef}>
      <div style={{flexShrink: 0, width: outerPadding}} />
      {partners.map((partner) =>
        <PartnerCard
          key={partner.partnerId} {...partner}
          style={partnerCardStyle} onClick={scrollToPartner} stepId={stepId} />,
      )}
      <div style={{flexShrink: 0, width: outerPadding - 20}} />
    </div> : partners.map((partner) => <ExternalPartner
      key={partner.partnerId} {...partner}
      isOpen={currentPartner === partner.partnerId} onSelect={onSelect} />)}
    <Trans parent="p" style={paragrapheStyle}>
      Si vous pensez avoir déjà réussi cette étape, cliquez sur
      "Je l'ai fait moi-même" pour passer à l'étape suivante.
    </Trans>
    <div style={buttonWrapperStyle}>
      <StepValidationButton type="specific" stepId="training" stepValue="self">
        {t('Je l\'ai fait moi-même')}
      </StepValidationButton>
    </div>
  </Layout>
}

export default React.memo(PartnersPage)
