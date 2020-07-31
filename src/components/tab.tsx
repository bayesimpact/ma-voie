import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {Page, getPath} from 'store/url'

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
}

const genericTabStyle: React.CSSProperties = {
  color: colors.SILVER_THREE,
  display: 'inline-block',
  fontFamily: 'Lato, Helvetica',
  fontSize: 12,
  fontWeight: 'bold',
  paddingBottom: 5,
  textDecoration: 'none',
  textTransform: 'uppercase',
}
interface Props {
  selectedTab: number
  tabs: {
    redirect: Page
    text: JSX.Element
  }[]
}

const Tab = ({selectedTab, tabs}: Props): React.ReactElement => {
  const [translate] = useTranslation()
  return <div style={containerStyle}>
    {tabs.map((tab, index) => {
      const tabStyle = index === selectedTab ?
        {
          ...genericTabStyle,
          borderBottom: `2px solid ${colors.REDDISH_ORANGE}`,
          color: colors.REDDISH_ORANGE,
        } : genericTabStyle
      return <Link key={index} to={getPath(tab.redirect, translate)} style={tabStyle}>
        {tab.text}
      </Link>
    })}
  </div>
}


export default React.memo(Tab)
