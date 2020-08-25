import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {updateStep, useDispatch} from 'store/actions'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Button, {ButtonType} from 'components/button'
import {StepId} from 'components/pages/steps'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  stepId: StepId
  stepValue: bayes.maVoie.StepCertificate
  type?: ButtonType
}
const StepValidationButton = (props: ButtonProps): React.ReactElement => {
  const {children, onClick, stepId, stepValue, type = 'secondLevel'} = props
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const handleClick = useCallback((): void => {
    dispatch(updateStep(projectId, stepId, {completed: stepValue}))
    onClick?.()
  }, [dispatch, onClick, projectId, stepId, stepValue])

  // TODO(cyrille): Allow a fade-out before redirect.
  return <Link to={getPath(['STEPS'], t)} style={linkStyle}>
    <Button type={type} onClick={handleClick}>{children}</Button>
  </Link>
}

export default React.memo(StepValidationButton)
