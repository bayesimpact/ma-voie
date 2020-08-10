import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

import {RootState} from 'store/actions'
import {prepareT} from 'store/i18n'
import {useProject} from 'store/selections'
import {Page, getPath} from 'store/url'

import Layout from 'components/layout'
import CreateAccountPopup from 'components/create_account_popup'
import Step from 'components/step'
import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import formationIcon from 'images/formation-ico.svg'

const STEPS = [
  {
    color: colors.LIGHT_TAN,
    currentStep: 'Definition',
    icon: definitionIcon,
    isOpen: true,
    lastStep: '',
    page: ['DEFINITION'],
    title: prepareT('Définition de votre projet'),
  },
  {
    color: colors.SILVER,
    currentStep: 'Skills',
    icon: competencesIcon,
    isOpen: false,
    lastStep: 'Definition',
    page: ['SKILLS_LIST'],
    title: prepareT('Compétences'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    currentStep: 'Training',
    icon: formationIcon,
    isOpen: false,
    lastStep: 'Skills',
    // TODO(émilie): put the good path when reviewed
    page: ['SKILLS_LIST'],
    title: prepareT('Formations'),
  },
] as const
const stepsStyle: React.CSSProperties = {
  padding: '30px 0',
}
const arrowStyle: React.CSSProperties = {
  display: 'block',
  margin: '30px auto',
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const StepsPage = (): React.ReactElement => {
  const [translate] = useTranslation()
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
      history.push(getPath(page, translate))
    }
  }, [history, isConnected, setIsPopupShown, translate])

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

  // TODO(cyrille): Add step 4.
  return <Layout>
    <div style={stepsStyle}>
      {STEPS.map(({title, ...step}, index) => {
        const isOpen = step.isOpen
          || project?.steps[`is${step.lastStep}Done` as keyof bayes.maVoie.ProjectStep]
        const isDone = project?.steps[`is${step.currentStep}Done` as keyof bayes.maVoie.ProjectStep]
        return <React.Fragment key={index}>
          {index ? <ArrowDownIcon style={arrowStyle} color={colors.SILVER_THREE} /> : null}
          <Step index={index + 1} {...step} onClick={onClick} isOpen={isOpen} isDone={isDone}>
            {translate(title)}
          </Step>
        </React.Fragment>
      })}
    </div>
    {isPopupShown ? <CreateAccountPopup onClose={onClose} /> : null}
  </Layout>
}

export default React.memo(StepsPage)
