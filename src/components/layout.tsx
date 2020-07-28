import React from 'react'

import Header from 'components/header'

const containerStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  margin: '0 30px',
}

interface Props {
  children: React.ReactNode
  title?: string
}

const Layout = ({children, title}: Props): React.ReactElement => {
  return <React.Fragment>
    <Header title={title} />
    <div style={containerStyle}>
      {children}
    </div>
  </React.Fragment>
}

export default React.memo(Layout)
