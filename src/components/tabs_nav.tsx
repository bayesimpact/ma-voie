import React from 'react'
import {useTranslation} from 'react-i18next'
import {useLocation} from 'react-router'
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
export interface TabProps {
  redirect: Page
  title: React.ReactNode
}
interface TabsProps {
  tabs: readonly TabProps[]
}

const TabsNav = ({tabs}: TabsProps): React.ReactElement => {
  const [translate] = useTranslation()
  const {pathname} = useLocation()
  const selectedTabStyle = {
    ...genericTabStyle,
    borderBottom: `2px solid ${colors.REDDISH_ORANGE}`,
    color: colors.REDDISH_ORANGE,
  }
  return <div style={containerStyle}>
    {tabs.map((tab, index) => {
      const tabStyle = getPath(tab.redirect, translate) === pathname ?
        selectedTabStyle : genericTabStyle
      return <Link key={index} to={getPath(tab.redirect, translate)} style={tabStyle}>
        {tab.title}
      </Link>
    })}
  </div>
}


export default React.memo(TabsNav)
