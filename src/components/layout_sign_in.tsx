import React from 'react'

import Header from 'components/header'
import Layout from 'components/layout'

import ArrowsUserShapeImage from 'images/arrows-user-shape.svg'

const isMobileVersion = window.innerWidth <= 800

interface Props {
  bigTitle: string
  children: React.ReactNode
  style?: React.CSSProperties
}


const leftPanelStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  padding: '0 20px',
}
const titleStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontFamily: 'ProximaSoft',
  fontSize: 24,
  fontWeight: 'bold',
  lineHeight: 1.5,
  marginBottom: 20,
  textAlign: 'center',
}
const rightPanelStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: colors.TURQUOISE_BLUE,
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
}


const LayoutSignIn = ({bigTitle, children, style}: Props): React.ReactElement => {
  if (isMobileVersion) {
    return <Layout bigTitle={bigTitle} menu="site" style={style}>
      {children}
    </Layout>
  }
  return <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
    <Header menu="site" />
    <div style={{display: 'flex', flex: 1}}>
      <div style={leftPanelStyle}>
        <div style={{flex: 1, maxWidth: 360}}>
          <h1 style={titleStyle}>
            {bigTitle}
          </h1>
          {children}
        </div>
      </div>
      <div style={rightPanelStyle}>
        <img src={ArrowsUserShapeImage} alt="" />
      </div>
    </div>
  </div>
}


export default React.memo(LayoutSignIn)
