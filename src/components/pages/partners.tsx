import ChevronDownIcon from 'mdi-react/ChevronDownIcon'
import ChevronUpIcon from 'mdi-react/ChevronUpIcon'
import React, {useCallback, useMemo, useRef, useState} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {useLocation, useRouteMatch} from 'react-router'
import {Redirect} from 'react-router-dom'

import {updateSteps, useDispatch} from 'store/actions'
import {prepareT} from 'store/i18n'
import {useCertifiedSteps, useProject} from 'store/selections'
import {getPath} from 'store/url'
import Partners, {Props as PartnerProps} from 'store/partners'
import Steps, {StepInfo} from 'store/steps'

import Button from 'components/button'
import Layout from 'components/layout'
import ExternalPartner from 'components/external_partner'
import PartnerCard from 'components/partner_card'
import StepValidationButton from 'components/step_validation_button'
import TabsNav, {TabProps} from 'components/tabs_nav'

import logoCPF from 'images/logo-mcf.svg'


const isMobileVersion = window.innerWidth <= 800

const desktopLayoutStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: 940,
}
const titleStyle: React.CSSProperties = {
  fontSize: 24,
  lineHeight: 1.5,
  margin: '30px 0 15px',
}
const tabTitleStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
  fontSize: 13,
  textTransform: 'uppercase',
}
const hrStyle: React.CSSProperties = {
  backgroundColor: colors.SILVER_TWO,
  height: 1,
  margin: '30px 0',
}
const chevronIconStyle: React.CSSProperties = {
  color: colors.GREYISH_TEAL,
  cursor: 'pointer',
}
const partnerCardStyle: React.CSSProperties = {
  margin: '20px 20px 20px 0',
  width: isMobileVersion ? 'initial' : 280,
}
const autoValidationBoxStyle: React.CSSProperties = {
  border: `solid 1px ${colors.SILVER_TWO}`,
  borderRadius: 21,
  margin: '50px 0',
  padding: 30,
  textAlign: 'center',
}
const buttonWrapperStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: 400,
  padding: '10px 20px 0',
}
const paragrapheStyle: React.CSSProperties = {
  fontSize: 14,
  padding: '0 20px',
}
const TABS_WITHOUT_STEP: readonly TabProps[] = [
  {
    redirect: ['PARTNERS_INTERNAL'],
    title: <Trans>Certifiés par $t(productName)</Trans>,
  },
  {
    redirect: ['PARTNERS_EXTERNAL'],
    title: <Trans>Autres partenaires</Trans>,
  },
]

const introStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 12,
  marginTop: 35,
  textTransform: 'uppercase',
}
const stopButtonStyle: React.CSSProperties = {
  border: `solid 1px ${colors.SILVER_THREE}`,
  marginTop: 40,
}

const CPFContainerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 20,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,.2)',
  display: 'flex',
  flexDirection: 'column',
  fontSize: 13,
  margin: '20px 0',
  minWidth: 315,
  overflow: 'hidden',
  position: 'relative',
  width: 315,
}
const innerCPFContainerStyle: React.CSSProperties = {
  margin: '0px 30px 40px',
}
const CPFLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const CPFButtonStyle: React.CSSProperties = {
  marginTop: 20,
}
const CPFTitleStyle: React.CSSProperties = {
  padding: '20px 20px 0',
  textAlign: 'center',
}

interface SelectedPartnerProps {
  partner: PartnerProps
  step: StepInfo
}
const SelectedPartnerPageBase = ({partner, step: {stepId, title}}: SelectedPartnerProps):
React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const dispatch = useDispatch()
  const stopPartner = useCallback((): void => {
    dispatch(updateSteps({[stepId]: {}}))
  }, [dispatch, stepId])
  return <Layout header={translate(title || '')}>
    <div style={introStyle}>{t('Vous avez choisi\u00A0:')}</div>
    <PartnerCard {...partner} isSelected={true} stepId={stepId} />
    <Button type="discreet" onClick={stopPartner} style={stopButtonStyle}>
      {t('Arrêter maintenant')}
    </Button>
  </Layout>
}
const SelectedPartnerPage = React.memo(SelectedPartnerPageBase)


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const PartnersPage = (): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const {url} = useRouteMatch('/:step') || {}
  const {pathname} = useLocation()
  const project = useProject()
  const [areExternalsShown, setAreExternalsShown] = useState(false)
  const toggleExternals = useCallback((): void => {
    setAreExternalsShown((a: boolean): boolean => !a)
  }, [])
  const [currentPartner, setCurrentPartner] = useState<null|string>(null)
  const onSelect = useCallback((partnerId: string) =>
    setCurrentPartner(previousPartnerId => partnerId === previousPartnerId ? null : partnerId),
  [])
  const stepIndex = Steps.findIndex(({page}) => getPath(page, t) === url)
  const step = Steps[stepIndex]
  const hasNextStep = !!Steps[stepIndex + 1]
  const {page, title = '', shortTitle = title, stepId}: Partial<StepInfo> = step || {}
  const tabs = useMemo(() => TABS_WITHOUT_STEP.map(({redirect, ...tab}) => ({
    ...tab,
    redirect: [...page || [], ...redirect],
  })), [page])
  const areInternalShown = pathname.endsWith(getPath(['PARTNERS_INTERNAL'], t))
  const partnersForStep = stepId && Partners.filter(({steps}) => steps.includes(stepId))
  const partners = partnersForStep?.filter(({isInternal}) => !isInternal === !areInternalShown)
  const partnersContainerRef = useRef<HTMLDivElement>(null)
  const scrollToPartner = useCallback((currentPartner: string): void => {
    if (!partners) {
      return
    }
    const position = Math.max(
      0, partners.findIndex(({partnerId}) => currentPartner === partnerId))
    partnersContainerRef.current?.scrollTo(335 * position, 0)
  }, [partners])
  const steps = useCertifiedSteps()
  if (!url || !stepId || !partnersForStep || !partners || !step) {
    return <Redirect to={getPath([], t)} />
  }
  const {isStarted, selectedPartnerId} = steps?.[stepId] || {}
  const selectedPartner = selectedPartnerId &&
    Partners.find(({partnerId}) => partnerId === selectedPartnerId)
  if (isStarted && selectedPartner) {
    if (!areInternalShown) {
      return <Redirect to={getPath(['PARTNERS_INTERNAL'], t)} />
    }
    return <SelectedPartnerPage partner={selectedPartner} step={step} />
  }
  // Extra padding added by a wrapper div in the Layout.
  const outerPadding = 30
  const partnersContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    margin: `0 ${-outerPadding}px`,
    overflowX: 'scroll',
    padding: isMobileVersion ? 0 : `0 ${outerPadding}px`,
    scrollBehavior: 'smooth',
    width: isMobileVersion ? '100vw' : 'initial',
  }
  const bigTitle = prepareT('Voici les partenaires idéaux pour vous aider')
  const autoValidation = <React.Fragment>
    <Trans parent="p" style={paragrapheStyle}>
      Si vous pensez avoir déjà réussi cette étape, cliquez sur
      "Je l'ai fait moi-même" pour passer à l'étape suivante.
    </Trans>
    <div style={buttonWrapperStyle}>
      <StepValidationButton type="specific" stepId={stepId} stepValue="self">
        {t('Je l\'ai fait moi-même')}
      </StepValidationButton>
    </div>
  </React.Fragment>
  // TODO(émilie) : Manage a desktop version for the CPF.
  const CPFLInk = `https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche?q={"nombreOccurences":10,"debutPagination":1,"displayName":"${project.job?.name}","sort":"SCORE","filters":{"price":{"minValue":0,"maxValue":10000,"step":500,"value":10000},"distance":{"minValue":0,"maxValue":1000,"defaultValue":500,"step":20,"value":500}},"where":{"area":0,"aroundMe":false,"modality":"2"},"_what":"${project.job?.name}"}`
  const CPFPartner = <React.Fragment>
    <div style={CPFContainerStyle}>
      <div style={CPFTitleStyle}>
        <img src={logoCPF} alt={name} />
        <h1>{t('Formations gratuites avec votre CPF')}</h1>
      </div>
      <div style={innerCPFContainerStyle}>
        <Trans parent="p">
          Nous avons peut-être trouvé des formations disponibles gratuitement avec votre
          compte personnel de formation (CPF). Saviez-vous que tous les ans, vous cumulez
          des droits à la formation, que vous pouvez utiliser en quelques clics&nbsp;?
        </Trans>
        <a href={CPFLInk} target="_blank" rel="noopener noreferrer" style={CPFLinkStyle}>
          <Button type="firstLevel" style={CPFButtonStyle}>Voir les formations</Button>
        </a>
      </div>
    </div>
  </React.Fragment>
  if (isMobileVersion) {
    return <Layout header={translate(shortTitle)} bigTitle={bigTitle}>
      <TabsNav tabs={tabs} />
      {areInternalShown ? <React.Fragment>
        <div className="no-scrollbars" style={partnersContainerStyle} ref={partnersContainerRef}>
          <div style={{flexShrink: 0, width: outerPadding}} />
          {partners.map((partner) =>
            <PartnerCard
              key={partner.partnerId} {...partner}
              style={partnerCardStyle} onClick={scrollToPartner} stepId={stepId} />,
          )}
          <div style={{flexShrink: 0, width: outerPadding - 20}} />
        </div>
        {stepId === 'training' ? CPFPartner : null}
      </React.Fragment> : partners.map((partner) => <ExternalPartner
        key={partner.partnerId} {...partner} stepId={stepId}
        isOpen={currentPartner === partner.partnerId} onSelect={onSelect} />)}
      {hasNextStep ? autoValidation : null}
    </Layout>
  }
  const ChevronIcon = areExternalsShown ? ChevronUpIcon : ChevronDownIcon
  const externalPartners = (partnersForStep || []).filter(({isInternal}) => !isInternal)
  return <Layout header={translate(shortTitle)} style={desktopLayoutStyle}>
    <h1 style={titleStyle}>{bigTitle}</h1>
    <h2 style={tabTitleStyle}>{TABS_WITHOUT_STEP[0].title}</h2>
    <div style={partnersContainerStyle} ref={partnersContainerRef}>
      {partnersForStep?.filter(({isInternal}) => !!isInternal).map((partner) =>
        <PartnerCard
          key={partner.partnerId} {...partner}
          style={partnerCardStyle} stepId={stepId} />,
      )}
      <div style={{flex: 'none', width: outerPadding}} />
    </div>

    {stepId === 'training' ?
      <div style={partnersContainerStyle}>
        {CPFPartner}
      </div> : null}

    {externalPartners.length ? <React.Fragment>
      <div style={hrStyle} />

      <h2 style={{...tabTitleStyle, alignItems: 'center', display: 'flex'}}>
        {TABS_WITHOUT_STEP[1].title}
        <span style={{flex: 1}} />
        <ChevronIcon
          onClick={toggleExternals}
          style={chevronIconStyle} role="button"
          aria-label={areInternalShown ?
            t('montrer les autres partenaires') : t('masquer les autres partenaires')
          } size={34} />
      </h2>
      {areExternalsShown && externalPartners.
        map((partner) => <ExternalPartner
          key={partner.partnerId} {...partner} stepId={stepId}
          isOpen={currentPartner === partner.partnerId} onSelect={onSelect} />)}
    </React.Fragment> : null}

    {hasNextStep ? <React.Fragment>
      <div style={hrStyle} />

      <div style={autoValidationBoxStyle}>
        {autoValidation}
      </div>
    </React.Fragment> : null}
  </Layout>
}

export default React.memo(PartnersPage)
