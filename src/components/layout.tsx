import React from 'react'

import Header from 'components/header'

const containerStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  margin: '0 30px',
}

interface Props {
  title?: string
  children: React.ReactNode
}

const Layout = ({title, children}: Props): React.ReactElement => {
  return <React.Fragment>
    <Header title={title} />
    <div style={containerStyle}>
      {children}
    </div>
  </React.Fragment>
}

export default React.memo(Layout)
