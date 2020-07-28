import React from 'react'

import Button from 'components/button'

const containerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 20,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,.2)',
  fontSize: 13,
  margin: '20px 0',
  overflow: 'hidden',
}
const contentStyle: React.CSSProperties = {
  margin: '0 32px 0 20px',
}
const titleStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 27,
}
const titleDetailsStyle: React.CSSProperties = {
  paddingTop: 15,
  textAlign: 'right',
}
const titleDetailsBoldStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 'bold',
}
const titleDetailsContentStyle: React.CSSProperties = {
  fontSize: 12,
  marginTop: -3,
}
const imageStyle: React.CSSProperties = {
  height: 64,
  width: 126,
}
const descriptionStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 14,
  marginBottom: 12,
  marginLeft: -10,
}
const infoStyle: React.CSSProperties = {
  backgroundColor: colors.TEAL_BLUE,
  color: '#fff',
  marginTop: 12,
  padding: '12px 65px 12px 66px',
}

interface Props {
  list: string[]
  logo: string
  title: string
  details: string
  info: string
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}
const PartnerCard = ({
  list, logo, title, details, info, onClick,
}: Props): React.ReactElement => {

  return <div style={containerStyle}>
    <div style={contentStyle}>
      <div style={titleStyle}>
        <img src={logo} alt="logo" style={imageStyle} />
        <div style={titleDetailsStyle}>
          <div style={titleDetailsBoldStyle}>{title}</div>
          <div style={titleDetailsContentStyle}>{details}</div>
        </div>
      </div>
      <ul style={descriptionStyle}>
        {list.map(item =>
          <li key={item}>{item}</li>,
        )}
      </ul>
      <Button bgColor={colors.REDDISH_ORANGE} onClick={onClick}>Choisir</Button>
      <Button color={colors.DARK_FOREST_GREEN} hasBorder={true} onClick={onClick} >
        Découvrir
      </Button>
    </div>
    <div style={infoStyle}>{info}</div>
  </div>
}
export default React.memo(PartnerCard)
