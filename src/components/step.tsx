import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'

import {joinList} from 'store/i18n'
import {StepInfo} from 'store/steps'
import {Page} from 'store/url'

import Button from 'components/button'

import doneIcon from 'images/done-ico.svg'
import lockIcon from 'images/lock-ico.svg'

const headerStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: colors.TEAL_BLUE,
  color: '#fff',
  display: 'flex',
  height: 40,
  justifyContent: 'center',
  textAlign: 'center',
}
const indexStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
  margin: '0 auto',
  textTransform: 'uppercase',
}
const titleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold',
}
const forbiddenStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 'bold',
}
export interface StepProps extends Pick<StepInfo, 'color'|'icon'|'page'> {
  children: React.ReactNode
  index: number
  isDone?: boolean
  isOpen?: boolean
  onClick?: (page: Page) => void
  style?: React.CSSProperties
}
const Step = ({
  children, color, icon, index, isDone, isOpen, onClick, page, style}: StepProps):
React.ReactElement => {
  const {t} = useTranslation()
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    border: `1px solid ${isOpen ? 'transparent' : colors.SILVER_TWO}`,
    borderRadius: 20,
    boxShadow: isOpen ? '0 4px 24px 0 rgba(0,0,0,.2)' : 'initial',
    fontSize: 13,
    overflow: 'hidden',
    ...style,
  }
  const contentStyle: React.CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: isOpen ? '25px 30px 30px' : 35,
  }
  const imageStyle: React.CSSProperties = {
    padding: 20,
    position: 'relative',
  }
  const doneStyle: React.CSSProperties = {
    bottom: 20,
    height: 24,
    position: 'absolute',
    right: 20,
    width: 24,
  }
  const iconStyle: React.CSSProperties = {
    backgroundColor: color,
    borderRadius: 35,
    height: 70,
    width: 70,
  }
  const handleClick = useCallback((): void => {
    if (onClick) {
      onClick(page)
    }
  }, [onClick, page])
  return <div style={containerStyle}>
    {isOpen ? <div style={headerStyle}>{t('En cours')}</div> : null}
    <div style={contentStyle}>
      <div style={indexStyle}>{t('étape {{index}}', {index})}</div>
      <div style={titleStyle}>{children}</div>
      <div style={imageStyle}>
        <img style={iconStyle} src={isOpen ? icon : lockIcon} alt="" />
        {isDone ? <img style={doneStyle} src={doneIcon} alt="" /> : null}
      </div>
      {isDone ? <Button type="small">{t('Terminé')}</Button> :
        isOpen ? <Button type="firstLevel" onClick={handleClick}>{t('Commencez')}</Button> :
          // TODO(cyrille): Replace with the list of steps to complete beforehand.
          <span style={forbiddenStyle}>
            {t("Terminez l'étape {{steps}}", {
              count: index - 1,
              steps: joinList(new Array(index - 1).
                fill(undefined).
                map((step, index) => (index + 1).toString()), t),
            })}
          </span>}
    </div>
  </div>
}
export default React.memo(Step)
