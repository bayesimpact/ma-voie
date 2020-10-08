import React, {useCallback, useRef} from 'react'
import {Trans, useTranslation} from 'react-i18next'

import {useWindowWidth} from 'hooks/resize'

import Button from 'components/button'
import {feedbackClickAction, useDispatch} from 'store/actions'

const blocStyle: React.CSSProperties = {
  backgroundColor: colors.TURQUOISE_BLUE,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  bottom: 0,
  padding: '23px 40px',
  position: 'absolute',
}
const desktopStyle: React.CSSProperties = {
  ...blocStyle,
  height: 145,
  marginLeft: 'calc((100% - 270px - 625px) / 2)',
  maxWidth: 625,
  width: 625,
}
const textContainerStyle: React.CSSProperties = {
}
const desktopTextContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
}
const titleStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: 20,
  fontStyle: 'italic',
  textAlign: 'center',
}
const desktopTitleStyle: React.CSSProperties = {
  ...titleStyle,
  textAlign: 'left',
}
const textStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: 14,
  fontStyle: 'italic',
  textAlign: 'center',
}
const desktopTextStyle: React.CSSProperties = {
  ...textStyle,
  textAlign: 'left',
  width: 280,
}
const buttonStyle: React.CSSProperties = {
  margin: 40,
}
const desktopButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  margin: 0,
  width: 255,
}
const desktopLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

const questionDivStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: colors.TURQUOISE_BLUE,
  borderRadius: '50%',
  color: '#fff',
  display: 'flex',
  fontWeight: 'bold',
  height: 20,
  justifyContent: 'center',
  marginLeft: 20,
  width: 20,
}
const titleShortStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  flex: 1,
  fontStyle: 'italic',
  fontWeight: 'bold',
  marginLeft: 20,
}
const arrowStyle: React.CSSProperties = {
  color: colors.GREYISH_TEAL,
  fontSize: 30,
  fontWeight: 'bold',
  marginRight: 20,
  paddingBottom: 3,
}
const stickyDivStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: '#fff',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  bottom: 0,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,.2)',
  display: 'flex',
  height: 54,
  position: 'fixed',
  width: '100%',
}

const Feedback = (): React.ReactElement => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const windowWidth = useWindowWidth()
  const isMenuAlwaysShown = windowWidth > 1300
  const insertRef = useRef<HTMLDivElement>(null)

  const title = t('Que pensez-vous de $t(productName)\u00A0?')

  const handleFeedbackClick = useCallback((): void => {
    dispatch(feedbackClickAction)
  }, [dispatch])

  const scrollToInsert = useCallback((): void => {
    if (!insertRef.current?.offsetTop) {
      return
    }
    window.scrollTo(0, insertRef.current?.offsetTop)
  }, [])

  return <React.Fragment>
    {isMenuAlwaysShown ? null : <div style={stickyDivStyle} onClick={scrollToInsert}>
      <div style={questionDivStyle}>?</div>
      <div style={titleShortStyle}>{title}</div>
      <div style={arrowStyle}>&rsaquo;</div>
    </div>}
    <div style={isMenuAlwaysShown ? desktopStyle : blocStyle} ref={insertRef}>
      <h1 style={isMenuAlwaysShown ? desktopTitleStyle : titleStyle}>{title}</h1>
      <div style={isMenuAlwaysShown ? desktopTextContainerStyle : textContainerStyle}>
        <Trans style={isMenuAlwaysShown ? desktopTextStyle : textStyle}>
          $t(productName) vous appartient&nbsp;: dites-nous comment l'améliorer.
          Vos retours sont décisifs en tant que 100 premiers testeurs&nbsp;!
        </Trans>
        <a href="https://forms.gle/zRi6q4g7foZGd1HEA" onClick={handleFeedbackClick}
          target="_blank" rel="noopener noreferrer" style={desktopLinkStyle}>
          <Button type="feedback" style={isMenuAlwaysShown ? desktopButtonStyle : buttonStyle}>
            {t('Donner mon avis')}
          </Button>
        </a>
      </div>
    </div>
  </React.Fragment>
}

export default React.memo(Feedback)
