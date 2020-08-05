import React from 'react'

import {colorToAlpha} from 'components/colors'

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

export default React.memo(Button)
