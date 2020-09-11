import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {useFirestore} from 'react-redux-firebase'
import {useHistory} from 'react-router'
import sha1 from 'sha1'

import {Props as PartnerProps} from 'store/partners'
import {usePartnerCount, useSelector, useStepsUpdater, useUserId} from 'store/selections'
import {getPath} from 'store/url'

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
  maxHeight: 32,
  maxWidth: 126,
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
    stepId, style, title} = props
  const {t} = useTranslation()
  const userCount = usePartnerCount(partnerId)
  const firestore = useFirestore()
  const userId = useUserId()
  const history = useHistory()
  const {email, lastName, name: userName} = useSelector(({firebase: {profile}}) =>
    profile as bayes.maVoie.User)
  const stepsUpdater = useStepsUpdater()
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
  const userPartnerId = sha1(userId + partnerId)
  const choosePartner = useCallback((): void => {
    // TODO(cyrille): Do not try to set it if it's already there.
    firestore.
      collection('users').
      doc(userId).
      collection('partners').
      doc(userPartnerId).
      set({
        partnerId,
        userPartnerId,
      })
    // TODO(cyrille): Add user info to url.
    stepsUpdater({[stepId]: {selectedPartnerId: partnerId}})
    const parsedUrl = new URL(url)
    const query = new URLSearchParams(parsedUrl.search)
    Object.entries({
      email,
      lastName,
      maVoieId: userPartnerId,
      name: userName,
      stepId,
    }).
      filter((pair): pair is [string, string] => !!pair[1]).
      forEach(([key, value]) => {
        query.append(key, value)
      })
    parsedUrl.search = query.toString()
    window.open(parsedUrl.toString(), '_blank')
    if (stepId === 'interview') {
      history.push(getPath(['CONGRATULATIONS'], t))
    }
  }, [email, firestore, history, lastName, partnerId, stepId, stepsUpdater, t, url, userId,
    userName, userPartnerId])

  return <section style={finalContainerStyle} onClick={handleClick} id={partnerId} data-partner>
    <div style={contentStyle}>
      <div style={titleStyle}>
        <img src={logo} alt={name} style={imageStyle} />
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
      <div style={topInfoStyle}>{t('En cours')}</div> : userCount ?
        <Trans count={userCount} style={infoStyle}>
          {{userCount}} personne a choisi {{name}}
        </Trans> : null}
  </section>
}
export default React.memo(PartnerCard)
