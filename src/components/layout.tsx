import React from 'react'

const containerStyle: React.CSSProperties = {
  margin: '0 30px',
}

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props): React.ReactElement => {
  return (
    <div style={containerStyle}>
      {children}
    </div>
  )
}

export default React.memo(Layout)
