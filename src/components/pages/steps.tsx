import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

import {FirebaseAuth} from 'database/firebase'
import {RootState} from 'store/actions'
import {joinList, prepareT} from 'store/i18n'
import {useProject} from 'store/selections'
import {Page, getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import CreateAccountPopup from 'components/create_account_popup'
import Step from 'components/step'
import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import formationIcon from 'images/formation-ico.svg'

const soonAvailable = (): void => window.alert('Bientôt disponible...')

export interface StepInfo {
  color: string
  icon: string
  isOpen?: boolean
  isLastStep?: boolean
  page: Page
  shortTitle?: string
  stepId: 'definition' | 'skills' | 'training' | 'interview'
  title: string
}
export type StepId = StepInfo['stepId']

// TODO(cyrille): Move to store.
export const STEPS: readonly StepInfo[] = [
  {
    color: colors.LIGHT_TAN,
    icon: definitionIcon,
    page: ['DEFINITION'],
    shortTitle: prepareT('Définition'),
    stepId: 'definition',
    title: prepareT('Définition de votre projet'),
  },
  {
    color: colors.SILVER,
    icon: competencesIcon,
    page: ['SKILLS'],
    stepId: 'skills',
    title: prepareT('Compétences'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    icon: formationIcon,
    page: ['TRAINING'],
    shortTitle: prepareT('Formation'),
    stepId: 'training',
    title: prepareT('Formations'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    icon: formationIcon, // TODO(émilie): Update when known
    isLastStep: true,
    page: ['TRAINING'], // TODO(émilie): Updated when done
    shortTitle: prepareT('Entretiens'),
    stepId: 'interview',
    title: prepareT('Préparer un entretien'),
  },
]

const stepsStyle: React.CSSProperties = {
  padding: '30px 0',
}
const arrowStyle: React.CSSProperties = {
  display: 'block',
  margin: '30px auto 0',
}
const interviewStyle: React.CSSProperties = {
  color: colors.GREYISH_TEAL,
}
const interviewDisclaimerStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
  fontSize: 14,
  marginTop: 15,
  textAlign: 'center',
}
const scrollableStepStyle: React.CSSProperties = {
  paddingTop: 30,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const StepsPage = (): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const history = useHistory()
  const [isPopupShown, setIsPopupShown] = useState(false)

  const name = useSelector(({user: {name}}: RootState) => name)
  const lastName = useSelector(({user: {lastName}}: RootState) => lastName)
  const currentUser = FirebaseAuth.currentUser
  const isConnected = (currentUser !== null && name !== undefined && lastName !== undefined)
  const project = useProject()

  const nextStep = STEPS.find(({stepId}) => !project.steps?.[stepId]?.completed)?.stepId
  const nextStepRef = useRef<HTMLDivElement>(null)
  useEffect((): (() => void) => {
    // TODO(cyrille): Try to scroll to the last completed step before.
    const timeout = window.setTimeout(
      (): void => nextStepRef.current?.scrollIntoView({behavior: 'smooth'}), 500)
    return (): void => clearTimeout(timeout)
  }, [nextStep])
  const getStepRef = (index: number): undefined|React.RefObject<HTMLDivElement> =>
    STEPS[index]?.stepId === nextStep ? nextStepRef : undefined

  const onClick = useCallback((page: Page): void => {
    if (!isConnected) {
      setIsPopupShown(true)
    } else {
      history.push(getPath(page, t))
    }
  }, [history, isConnected, setIsPopupShown, t])

  const onClose = useCallback((): void => {
    setIsPopupShown(false)
  }, [setIsPopupShown])

  useEffect((): void => {
    if (isPopupShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isPopupShown])

  return <Layout>
    <div style={stepsStyle}>
      {STEPS.map(({isLastStep, title, ...step}, index) => {
        const stepListJoin = joinList(STEPS.map((step, index) => (index).toString()), t)
        const isDone = !!project.steps?.[step.stepId]?.completed
        const isOpen = !isDone
          && (!index || !!project.steps?.[STEPS[index - 1].stepId]?.completed)
        return <React.Fragment key={index}>
          {index ? <ArrowDownIcon style={arrowStyle} color={colors.SILVER_THREE} /> : null}
          {!isLastStep || isOpen || isDone ?
            <div style={scrollableStepStyle} ref={getStepRef(index)}>
              <Step index={index + 1} {...step} onClick={onClick} isOpen={isOpen} isDone={isDone}>
                {translate(title)}
              </Step>
            </div>
            : <div style={scrollableStepStyle} ref={getStepRef(STEPS.length)}>
              <Button style={interviewStyle} onClick={soonAvailable} type="variable">
                {t('Préparer un entretien')}
              </Button>
            </div>}
          {!!isLastStep && !isOpen && !isDone ?
            <Trans count={STEPS.length} style={interviewDisclaimerStyle}>
              Il est préférable de terminer
              l'étape {{steps: stepListJoin}} avant
              de vous préparer pour les entretiens.
            </Trans> : null}
        </React.Fragment>
      })}
    </div>
    {isPopupShown ? <CreateAccountPopup onClose={onClose} /> : null}
  </Layout>
}

export default React.memo(StepsPage)
