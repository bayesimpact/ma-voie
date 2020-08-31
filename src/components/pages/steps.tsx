import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
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

const soonAvailable = (): void => window.alert('Bientôt disponible...')

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

  return <Layout>
    <div style={stepsStyle}>

      {Steps.map(({isLastStep, title, ...step}, index) => {
        if (isLastStep) {
          return null
        }
        const isDone = !!project.steps?.[step.stepId]?.completed
        const isOpen = step.stepId === openStep?.stepId
        return <React.Fragment key={index}>
          {index ? <ArrowDownIcon style={arrowStyle} color={colors.SILVER_THREE} /> : null}
          <div style={scrollableStepStyle} ref={getStepRef(index)}>
            <Step
              index={index + 1} {...step} onClick={handleStepClick} isOpen={isOpen} isDone={isDone}>
              {translate(title)}
            </Step>
          </div>
        </React.Fragment>
      })}

      <ArrowDownIcon style={arrowStyle} color={colors.SILVER_THREE} />
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
