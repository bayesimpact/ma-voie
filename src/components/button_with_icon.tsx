import React from 'react'

import iconEmail from 'images/mail-ico.png'
import iconFacebook from 'images/facebook-ico.png'
import iconGoogle from 'images/google-ico.png'

const buttonStyle: React.CSSProperties = {
  alignItems: 'center',
  alignSelf: 'stretch',
  border: 0,
  borderRadius: 25,
  display: 'flex',
  fontFamily: 'ProximaSoft',
  fontSize: 15,
  fontWeight: 'normal',
  height: 50,
  justifyContent: 'center',
  paddingLeft: 0,
  position: 'relative',
  textAlign: 'center',
}

const buttonsStyle = {
  email: {
    ...buttonStyle,
    backgroundColor: colors.TEAL_BLUE,
    color: '#fff',
  },
  facebook: {
    ...buttonStyle,
    backgroundColor: colors.FACEBOOK,
    color: '#fff',
  },
  google: {
    ...buttonStyle,
    backgroundColor: '#fff',
    borderColor: colors.DARK_FOREST_GREEN,
    borderStyle: 'solid',
    borderWidth: 0.5,
    color: colors.DARK_FOREST_GREEN,
  },
} as const

export type ButtonIconType = keyof typeof buttonsStyle

const iconBaseStyle: React.CSSProperties = {
  left: 20,
  position: 'absolute',
  top: 16,
}

const iconStyle = {
  email: iconBaseStyle,
  facebook: {
    ...iconBaseStyle,
    left: 24,
  },
  google: iconBaseStyle,
} as const

const iconImage = {
  email: iconEmail,
  facebook: iconFacebook,
  google: iconGoogle,
} as const

const spanStyle: React.CSSProperties = {
  margin: 'auto',
}

interface ButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  style?: React.CSSProperties
  type: ButtonIconType
}

const ButtonWithIcon = ({children, onClick, style, type}: ButtonProps): React.ReactElement => {
  const buttonFinalStyle: React.CSSProperties = {
    ...onClick ? {cursor: 'pointer'} : {},
    ...buttonsStyle[type],
    ...style,
  }
  return <div onClick={onClick} style={buttonFinalStyle}>
    <img src={iconImage[type]} alt="" style={iconStyle[type]} />
    <span style={spanStyle}>{children}</span>
  </div>
}

export default React.memo(ButtonWithIcon)
