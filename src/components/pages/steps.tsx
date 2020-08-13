import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
import React, {useCallback, useEffect, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

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
  page: Page
  shortTitle?: string
  stepId: 'definition' | 'skills' | 'training'
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
]

const stepsStyle: React.CSSProperties = {
  padding: '30px 0',
}
const arrowStyle: React.CSSProperties = {
  display: 'block',
  margin: '30px auto',
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

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const StepsPage = (): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const history = useHistory()
  const [isPopupShown, setIsPopupShown] = useState(false)

  const name = useSelector(({user: {name}}: RootState) => name)
  const lastName = useSelector(({user: {lastName}}: RootState) => lastName)
  const isConnected = (name !== undefined && lastName !== undefined)
  const project = useProject()

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
      {STEPS.map(({title, ...step}, index) => {
        const isDone = !!project.completedSteps?.[step.stepId]
        const isOpen = !isDone
          && (!index || !!project.completedSteps?.[STEPS[index - 1].stepId])
        return <React.Fragment key={index}>
          {index ? <ArrowDownIcon style={arrowStyle} color={colors.SILVER_THREE} /> : null}
          <Step index={index + 1} {...step} onClick={onClick} isOpen={isOpen} isDone={isDone}>
            {translate(title)}
          </Step>
        </React.Fragment>
      })}
      <ArrowDownIcon style={arrowStyle} color={colors.SILVER_THREE} />
      <Button style={interviewStyle} onClick={soonAvailable} type="variable">
        {t('Préparer un entretien')}
      </Button>
      <Trans count={STEPS.length} style={interviewDisclaimerStyle}>
        Il est préférable de terminer
        l'étape {{steps: joinList(STEPS.map((step, index) => (index + 1).toString()), t)}} avant de
        vous préparer pour les entretiens.
      </Trans>
    </div>
    {isPopupShown ? <CreateAccountPopup onClose={onClose} /> : null}
  </Layout>
}

export default React.memo(StepsPage)
