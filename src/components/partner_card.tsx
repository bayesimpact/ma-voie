import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {useFirestore} from 'react-redux-firebase'

import {Props as PartnerProps} from 'store/partners'
import {useProjectDocRefConfig, useProjectId} from 'store/selections'

import Button from 'components/button'

const containerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 20,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,.2)',
  fontSize: 13,
  margin: '20px 0',
  minWidth: 315,
  overflow: 'hidden',
  position: 'relative',
}
const titleStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 0 25px',
}
const titleDetailsStyle: React.CSSProperties = {
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
  width: 126,
}
const descriptionStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 14,
  lineHeight: 1.2,
  marginBottom: 12,
  marginLeft: -10,
  paddingBottom: 10,
}
const infoStyle: React.CSSProperties = {
  backgroundColor: colors.TEAL_BLUE,
  bottom: 0,
  color: '#fff',
  fontWeight: 'bold',
  left: 0,
  padding: '12px 60px',
  position: 'absolute',
  right: 0,
  textAlign: 'center',
}
const topInfoStyle: React.CSSProperties = {
  ...infoStyle,
  bottom: 'initial',
  top: 0,
}
const discreetAnchorStyle: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
}

interface Props extends PartnerProps {
  isSelected?: boolean
  onClick?: (partnerId: string) => void
  stepId: bayes.maVoie.StepId
  style?: React.CSSProperties
}
const PartnerCard = (props: Props): React.ReactElement => {
  const {description, details, url, discoverUrl = url, isSelected, logo, name, onClick, partnerId,
    stepId, style, title, userCount = 1} = props
  const {t} = useTranslation()
  const projectId = useProjectId()
  const docRefConfig = useProjectDocRefConfig()
  const firestore = useFirestore()
  const finalContainerStyle: React.CSSProperties = {
    ...containerStyle,
    ...style,
  }
  const contentStyle: React.CSSProperties = {
    margin: isSelected ? '60px 30px 45px' : '0 30px 50px',
  }
  const handleClick = useCallback((): void => {
    if (onClick && partnerId) {
      onClick(partnerId)
    }
  }, [partnerId, onClick])
  const choosePartner = useCallback((): void => {
    // TODO(cyrille): Add user info to url.
    firestore.update(docRefConfig, {steps: {[stepId]: {selectedPartnerId: partnerId}}})
    window.open(url, '_blank')
  }, [firestore, partnerId, projectId, stepId, url])
  return <div style={finalContainerStyle} onClick={handleClick} id={partnerId} data-partner>
    <div style={contentStyle}>
      <div style={titleStyle}>
        <img src={logo} alt="logo" style={imageStyle} />
        <div style={titleDetailsStyle}>
          <div style={titleDetailsBoldStyle}>{title}</div>
          <div style={titleDetailsContentStyle}>{details}</div>
        </div>
      </div>
      <div style={descriptionStyle}><ReactMarkdown source={description} /></div>
      {isSelected ?
        <a style={discreetAnchorStyle} href={url} rel="noopener noreferrer" target="_blank">
          <Button type="firstLevel">{t('Continuer')}</Button>
        </a> : <React.Fragment>
          <Button type="firstLevel" onClick={choosePartner}>{t('Choisir')}</Button>
          <a
            style={discreetAnchorStyle} href={discoverUrl} rel="noopener noreferrer"
            target="_blank">
            <Button type="discreet">{t('Découvrir')}</Button>
          </a>
        </React.Fragment>}
    </div>
    {isSelected ?
      <div style={topInfoStyle}>{t('En cours')}</div> :
      <Trans count={userCount} style={infoStyle}>
        {{userCount}} personne a choisi {{name}}
      </Trans>}
  </div>
}
export default React.memo(PartnerCard)
