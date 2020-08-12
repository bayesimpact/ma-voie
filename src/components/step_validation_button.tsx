import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {updateSteps, useDispatch} from 'store/actions'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'
import {StepId} from 'components/pages/steps'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonProps {
  children: React.ReactNode
  stepId: StepId
}
const StepValidationButton = ({children, stepId}: ButtonProps): React.ReactElement => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const handleClick = useCallback((): void => {
    dispatch(updateSteps(projectId, {[stepId]: true}))
  }, [dispatch, projectId, stepId])

  return <Link to={getPath(['STEPS'], t)} style={linkStyle}>
    <Button type="secondLevel" onClick={handleClick}>{children}</Button>
  </Link>
}

export default React.memo(StepValidationButton)
