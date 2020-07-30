import React from 'react'

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

interface Props {
  children: React.ReactNode
  color?: string
  bgColor?: string
  hasBorder?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

// TODO(émilie): Split the button into 4 different types of buttons instead of playing
// with color / bgColor / hasBorder
const Button =
  ({children, color, bgColor, hasBorder, onClick}: Props): React.ReactElement => {
    const buttonFinalStyle: React.CSSProperties = {
      ...buttonStyle,
      backgroundColor: bgColor || '#fff',
      border: (color && hasBorder !== false) ? `1px solid ${colors.SILVER_THREE}` : 0,
      color: color || '#fff',
    }

    return <div onClick={onClick} style={buttonFinalStyle}>{children}</div>
  }

export default React.memo(Button)
