import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {colorToAlpha} from 'components/colors'
import {updateProject, useDispatch} from 'store/actions'
import {useProjectId} from 'store/selections'
import {Page, getPath} from 'store/url'

const buttonStyle: React.CSSProperties = {
  alignItems: 'center',
  alignSelf: 'stretch',
  border: 0,
  borderRadius: 25,
  cursor: 'pointer',
  display: 'flex',
  fontFamily: 'ProximaSoft',
  fontSize: 18,
  fontWeight: 'bold',
  height: 50,
  justifyContent: 'center',
  textAlign: 'center',
}

const buttonsStyle = {
  discret: {
    ...buttonStyle,
    backgroundColor: '#fff',
    color: colors.DARK_FOREST_GREEN,
  },
  firstLevel: {
    ...buttonStyle,
    backgroundColor: colors.REDDISH_ORANGE,
    color: '#fff',
  },
  menu: {
    ...buttonStyle,
    backgroundColor: colors.DARK_TEAL,
    borderColor: colorToAlpha('#fff', .2),
    borderStyle: 'solid',
    borderWidth: 2,
    color: '#fff',
  },
  secondLevel: {
    ...buttonStyle,
    backgroundColor: colors.TEAL_BLUE,
    color: '#fff',
  },
  specific: {
    ...buttonStyle,
    backgroundColor: '#fff',
    borderColor: colors.SILVER_THREE,
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.TURQUOISE_BLUE,
  },
  variable: {
    ...buttonStyle,
    backgroundColor: '#fff',
    borderColor: colors.SILVER_THREE,
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.DARK_FOREST_GREEN,
  },
} as const

type ButtonType = keyof typeof buttonsStyle

interface ButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  style?: React.CSSProperties
  type: ButtonType
}

const Button = ({children, onClick, style, type}: ButtonProps): React.ReactElement => {
  const buttonFinalStyle: React.CSSProperties = {...buttonsStyle[type], ...style}
  return <div onClick={onClick} style={buttonFinalStyle}>{children}</div>
}

const buttonContainerStyle: React.CSSProperties = {
  display: 'block',
  paddingTop: 20,
}
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonBaseProps {
  experience?: 'new' | '1-3' | '3-5' | '5'
  hasDefinedProject?: boolean
  name: string
  objective?: 'job' | 'training'
  page: Page
}
const SelectButtonBase = ({
  experience, hasDefinedProject, name, objective, page}: ButtonBaseProps): React.ReactElement => {
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const [translate] = useTranslation()
  const onClick = useCallback(() => {
    if (hasDefinedProject)
      dispatch(updateProject({hasDefinedProject, projectId}))
    if (experience)
      dispatch(updateProject({experience, projectId}))
    if (objective)
      dispatch(updateProject({objective, projectId}))
  }, [dispatch, experience, hasDefinedProject, objective, projectId])
  return <div style={buttonContainerStyle}>
    <Link to={getPath(page, translate)} style={linkStyle}>
      <Button type="variable" onClick={onClick}>
        {translate(name)}
      </Button>
    </Link>
  </div>
}

const SelectButton = React.memo(SelectButtonBase)

export {SelectButton}

export default React.memo(Button)
