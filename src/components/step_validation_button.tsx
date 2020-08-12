import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {updateSteps, useDispatch} from 'store/actions'
import {useProjectId} from 'store/selections'
import {Page, getPath} from 'store/url'

import Button from 'components/button'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonProps {
  children: React.ReactNode
  page: Page
  stepId: string
}
const StepValidationButton = ({children, page, stepId}: ButtonProps): React.ReactElement => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const handleClick = useCallback((): void => {
    dispatch(updateSteps(projectId, {[stepId]: true}))
  }, [dispatch, projectId, stepId])

  return <Link to={getPath(page, t)} style={linkStyle}>
    <Button type="secondLevel" onClick={handleClick}>{children}</Button>
  </Link>
}

export default React.memo(StepValidationButton)
