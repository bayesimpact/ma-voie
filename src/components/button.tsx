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
const containerStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
}

interface Props {
  children: React.ReactNode
  color?: string
  bgColor?: string
  noBorder?: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Button = ({children, color, bgColor, noBorder, onClick}: Props): React.ReactElement => {
  const buttonFinalStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: bgColor ? bgColor : '#fff',
    border: (color && noBorder !== true) ? `1px solid ${colors.SILVER_THREE}` : 0,
    color: color ? color : '#fff',
  }

  return (
    <React.Fragment>
      <div style={containerStyle}>
        <div onClick={onClick} style={buttonFinalStyle}>{children}</div>
      </div>
    </React.Fragment>
  )
}

export default React.memo(Button)
