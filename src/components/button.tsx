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

const getFinalStyle = (type: string, style?: React.CSSProperties): Record<string, unknown> => {

  switch (type) {
    case 'reddish_orange':
      return {
        ...buttonStyle,
        backgroundColor: colors.REDDISH_ORANGE,
        color: '#fff',
        ...style,
      }
    case 'teal_blue':
      return {
        ...buttonStyle,
        backgroundColor: colors.TEAL_BLUE,
        color: '#fff',
        ...style,
      }
    case 'white':
      return {
        ...buttonStyle,
        backgroundColor: '#fff',
        borderColor: colors.SILVER_THREE,
        borderStyle: 'solid',
        borderWidth: 1,
        color: colors.DARK_FOREST_GREEN,
        ...style,
      }
    case 'white_no_border':
      return {
        ...buttonStyle,
        backgroundColor: '#fff',
        color: colors.DARK_FOREST_GREEN,
        ...style,
      }
    case 'turquoise_blue':
      return {
        ...buttonStyle,
        backgroundColor: '#fff',
        borderColor: colors.SILVER_THREE,
        borderStyle: 'solid',
        borderWidth: 1,
        color: colors.TURQUOISE_BLUE,
        ...style,
      }
    case 'dark_teal':
      return {
        ...buttonStyle,
        backgroundColor: colors.DARK_TEAL,
        borderColor: colorToAlpha('#fff', .2),
        borderStyle: 'solid',
        borderWidth: 2,
        color: '#fff',
        ...style,
      }
    default:
      return {
        ...buttonStyle,
        ...style,
      }

  }
}

interface ButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  style?: React.CSSProperties
  type: string
}

const Button = ({children, onClick, style, type}: ButtonProps): React.ReactElement => {
  const buttonFinalStyle: React.CSSProperties = getFinalStyle(type, style)
  return <div onClick={onClick} style={buttonFinalStyle}>{children}</div>
}

export default React.memo(Button)
