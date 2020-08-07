import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {Page, getPath} from 'store/url'

import Button from 'components/button'

const buttonContainerStyle: React.CSSProperties = {
  display: 'block',
  paddingTop: 20,
}
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonBaseProps {
  name: string
  onClick: (
    value?:
    | bayes.maVoie.ProjectExperience
    | bayes.maVoie.ProjectObjective
    | boolean
  ) => void
  page: Page
  value?:
  | bayes.maVoie.ProjectExperience
  | bayes.maVoie.ProjectObjective
  | boolean
}
const SelectButtonBase = ({name, onClick, page, value}: ButtonBaseProps): React.ReactElement => {
  const {t} = useTranslation()
  const handleClick = useCallback((): void => {
    onClick(value)
  }, [onClick, value])
  return <div style={buttonContainerStyle}>
    <Link to={getPath(page, t)} style={linkStyle}>
      <Button type="variable" onClick={handleClick}>
        {t(name)}
      </Button>
    </Link>
  </div>
}

const SelectButton = React.memo(SelectButtonBase)

export default React.memo(SelectButton)
