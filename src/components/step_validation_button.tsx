import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useFirestore} from 'react-redux-firebase'
import {Link} from 'react-router-dom'

import {useProjectDocRefConfig, useProjectId} from 'store/selections'
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
  const projectId = useProjectId()
  const docRefConfig = useProjectDocRefConfig()
  const firestore = useFirestore()
  const handleClick = useCallback((): void => {
    firestore.update(docRefConfig, {steps: {[stepId]: {completed: stepValue}}})
    onClick?.()
  }, [firestore, onClick, projectId, stepId, stepValue])

  // TODO(cyrille): Allow a fade-out before redirect.
  return <Link to={getPath(['STEPS'], t)} style={linkStyle}>
    <Button type={type} onClick={handleClick}>{children}</Button>
  </Link>
}

export default React.memo(StepValidationButton)
