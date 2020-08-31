import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
import ArrowRightIcon from 'mdi-react/ArrowRightIcon'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

import {FirebaseAuth} from 'database/firebase'
import {RootState} from 'store/actions'
import {joinList} from 'store/i18n'
import {useProject} from 'store/selections'
import Steps from 'store/steps'
import {Page, getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import CreateAccountPopup from 'components/create_account_popup'
import Step from 'components/step'

const isMobileVersion = window.innerWidth <= 800

const soonAvailable = (): void => window.alert('Bientôt disponible...')

const layoutStyle: React.CSSProperties = {
  maxWidth: 'initial',
}
const stepsStyle: React.CSSProperties = isMobileVersion ? {
  paddingTop: 30,
} : {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 auto',
  maxWidth: 960,
}
const stepStyle: React.CSSProperties = isMobileVersion ? {} : {
  height: 325,
  width: 250,
}
const lastStepContainerStyle: React.CSSProperties = isMobileVersion ? {
  paddingBottom: 30,
} : {
  border: `solid 1px ${colors.SILVER_TWO}`,
  borderRadius: 21,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column-reverse',
  margin: '30px auto',
  maxWidth: stepsStyle.maxWidth,
  padding: 30,
}
const arrowStyle: React.CSSProperties = {
  display: 'block',
  margin: isMobileVersion ? '30px auto 0' : '0 30px',
}
const interviewStyle: React.CSSProperties = {
  color: colors.GREYISH_TEAL,
  margin: isMobileVersion ? 'initial' : '0 auto',
  maxWidth: isMobileVersion ? 'initial' : 400,
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

  const nextStep = Steps.find(({stepId}) => !project.steps?.[stepId]?.completed)?.stepId
  const nextStepRef = useRef<HTMLDivElement>(null)
  useEffect((): (() => void) => {
    // TODO(cyrille): Try to scroll to the last completed step before.
    const timeout = window.setTimeout(
      (): void => nextStepRef.current?.scrollIntoView({behavior: 'smooth'}), 500)
    return (): void => clearTimeout(timeout)
  }, [nextStep])
  const getStepRef = (index: number): undefined|React.RefObject<HTMLDivElement> =>
    Steps[index]?.stepId === nextStep ? nextStepRef : undefined

  const handleStepClick = useCallback((page: Page): void => {
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

  const openStep = Steps.find(({stepId}): boolean => !(project.steps?.[stepId]?.completed))
  // TODO(pascal): Drop the isLastStep bool and just use the last element of the array.
  const stepListJoin = joinList(Steps.filter(({isLastStep}) => !isLastStep).
    map((step, index) => (index + 1).toString()), t)
  const lastStep = Steps.find(({isLastStep}) => isLastStep)

  const ArrowNextIcon = isMobileVersion ? ArrowDownIcon : ArrowRightIcon

  return <Layout style={layoutStyle}>
    <div style={stepsStyle}>

      {Steps.map(({isLastStep, title, ...step}, index) => {
        if (isLastStep) {
          return null
        }
        const isDone = !!project.steps?.[step.stepId]?.completed
        const isOpen = step.stepId === openStep?.stepId
        return <React.Fragment key={index}>
          {index ?
            <ArrowNextIcon style={arrowStyle} color={colors.SILVER_THREE} size={36} /> : null}
          <div style={scrollableStepStyle} ref={getStepRef(index)}>
            <Step
              index={index + 1} {...step} onClick={handleStepClick} isOpen={isOpen} isDone={isDone}
              style={stepStyle}>
              {translate(title)}
            </Step>
          </div>
        </React.Fragment>
      })}
    </div>

    <div style={lastStepContainerStyle}>
      {isMobileVersion ?
        <ArrowNextIcon style={arrowStyle} color={colors.SILVER_THREE} size={36} /> : null}
      {stepListJoin.length > 0 || !lastStep ?
        <React.Fragment>
          <div style={scrollableStepStyle} ref={getStepRef(Steps.length - 1)}>
            <Button style={interviewStyle} onClick={soonAvailable} type="variable">
              {translate(lastStep?.title || '')}
            </Button>
          </div>
          <Trans count={stepListJoin.length} style={interviewDisclaimerStyle}>
            Il est préférable de terminer
            l'étape {{steps: stepListJoin}} avant
            de vous préparer pour les entretiens.
          </Trans>
        </React.Fragment> :
        <div style={scrollableStepStyle} ref={getStepRef(Steps.length - 1)}>
          <Step
            index={Steps.length} {...lastStep} onClick={handleStepClick} isOpen={true}
            isDone={false}>
            {translate(lastStep?.title || '')}
          </Step>
        </div>}
    </div>
    {isPopupShown ? <CreateAccountPopup onClose={onClose} /> : null}
  </Layout>
}

export default React.memo(StepsPage)
