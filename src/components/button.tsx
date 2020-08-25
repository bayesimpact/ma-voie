import React from 'react'

import {colorToAlpha} from 'components/colors'

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
  email: {
    ...buttonStyle,
    backgroundColor: colors.TEAL_BLUE,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 0,
    position: 'relative',
  },
  facebook: {
    ...buttonStyle,
    backgroundColor: colors.FACEBOOK,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 0,
    position: 'relative',
  },
  firstLevel: {
    ...buttonStyle,
    backgroundColor: colors.REDDISH_ORANGE,
    color: '#fff',
  },
  google: {
    ...buttonStyle,
    backgroundColor: '#fff',
    borderColor: colors.DARK_FOREST_GREEN,
    borderStyle: 'solid',
    borderWidth: 0.5,
    color: colors.DARK_FOREST_GREEN,
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 0,
    position: 'relative',
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
  small: {
    ...buttonStyle,
    alignSelf: 'center',
    border: `solid 1px ${colors.SILVER_THREE}`,
    borderRadius: 18,
    fontSize: 13,
    fontWeight: 'normal',
    height: 30,
    padding: '0 20px',
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

export type ButtonType = keyof typeof buttonsStyle

const iconStyle: React.CSSProperties = {
  left: 20,
  position: 'absolute',
  top: 16,
}

const facebookIconStyle: React.CSSProperties = {
  left: 24,
  position: 'absolute',
  top: 16,
}

const spanStyle: React.CSSProperties = {
  margin: 'auto',
}

interface ButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  style?: React.CSSProperties
  type: ButtonType
}

const renderChildren = (type: ButtonType, children: React.ReactNode): React.ReactNode => {
  switch (type) {
    case 'email':
      return <React.Fragment>
        <img src={iconEmail} alt="Google" style={iconStyle} />
        <span style={spanStyle}>{children}</span>
      </React.Fragment>
    case 'facebook':
      return <React.Fragment>
        <img src={iconFacebook} alt="Google" style={facebookIconStyle} />
        <span style={spanStyle}>{children}</span>
      </React.Fragment>
    case 'google':
      return <React.Fragment>
        <img src={iconGoogle} alt="Google" style={iconStyle} />
        <span style={spanStyle}>{children}</span>
      </React.Fragment>
  }
  return children
}
const Button = ({children, onClick, style, type}: ButtonProps): React.ReactElement => {
  const buttonFinalStyle: React.CSSProperties = {
    ...onClick ? {cursor: 'pointer'} : {},
    ...buttonsStyle[type],
    ...style,
  }
  return <div onClick={onClick} style={buttonFinalStyle}>{renderChildren(type, children)}</div>
}

export default React.memo(Button)
