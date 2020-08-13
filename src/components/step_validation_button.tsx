import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {updateSteps, useDispatch} from 'store/actions'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Button, {ButtonType} from 'components/button'
import {StepId} from 'components/pages/steps'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonProps {
  children: React.ReactNode
  stepId: StepId
  stepValue: bayes.maVoie.StepAssessment
  type?: ButtonType
}
const StepValidationButton = (
  {children, stepId, stepValue, type = 'secondLevel'}: ButtonProps): React.ReactElement => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const handleClick = useCallback((): void => {
    dispatch(updateSteps(projectId, {[stepId]: stepValue}))
  }, [dispatch, projectId, stepId, stepValue])

  return <Link to={getPath(['STEPS'], t)} style={linkStyle}>
    <Button type={type} onClick={handleClick}>{children}</Button>
  </Link>
}

export default React.memo(StepValidationButton)
