import React from 'react'


const containerStyle: React.CSSProperties = {
  border: `2px solid ${colors.TEAL_BLUE}`,
  margin: '20px 0',
}
const titleContainerStyle: React.CSSProperties = {
  marginTop: -20,
}
const titleStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  color: colors.DARK_FOREST_GREEN,
  display: 'inline-block',
  fontSize: 22,
  fontWeight: 'bold',
  marginLeft: 12,
  padding: '0 12px',
}
const contentStyle: React.CSSProperties = {
  fontSize: 18,
  margin: '17px 20px 27px',
}

interface Props {
  title: string
  children: React.ReactNode
}

const Tip = ({title, children}: Props): React.ReactElement => {

  return (
    <React.Fragment>
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <div style={titleStyle}>{title}</div>
        </div>
        <div style={contentStyle}>{children}</div>
      </div>
    </React.Fragment>
  )
}

export default React.memo(Tip)
