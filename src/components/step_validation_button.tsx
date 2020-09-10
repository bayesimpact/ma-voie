import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {useStepsUpdater} from 'store/selections'
import {getPath} from 'store/url'

import Button, {ButtonType} from 'components/button'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  stepId: bayes.maVoie.StepId
  stepValue: bayes.maVoie.StepCertificate
  type?: ButtonType
}
const StepValidationButton = (props: ButtonProps): React.ReactElement => {
  const {children, onClick, stepId, stepValue, type = 'secondLevel'} = props
  const {t} = useTranslation()
  const stepsUpdater = useStepsUpdater()
  const handleClick = useCallback((): void => {
    // TODO(cyrille): Make sure we want to completely override the step.
    stepsUpdater({[stepId]: {completed: stepValue}})
    onClick?.()
  }, [onClick, stepId, stepsUpdater, stepValue])

  // TODO(cyrille): Allow a fade-out before redirect.
  return <Link to={getPath(['STEPS'], t)} style={linkStyle}>
    <Button type={type} onClick={handleClick}>{children}</Button>
  </Link>
}

export default React.memo(StepValidationButton)
