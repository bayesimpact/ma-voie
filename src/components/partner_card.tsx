import CircleIcon from 'mdi-react/CircleIcon'
import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {useHistory} from 'react-router'

import {linkPartner, updateSteps, useDispatch} from 'store/actions'
import {Props as PartnerProps} from 'store/partners'
import {usePartnerCount, useSelector} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'

const containerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 20,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,.2)',
  display: 'flex',
  fontSize: 13,
  margin: '20px 0',
  minWidth: 285,
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
  maxHeight: 48,
  maxWidth: 126,
}
const descriptionStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  flex: 1,
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
  padding: '12px 15px',
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
  cursor: 'pointer',
  textDecoration: 'none',
}

interface Props extends PartnerProps {
  isSelected?: boolean
  onClick?: (partnerId: string) => void
  stepId: bayes.maVoie.StepId
  style?: React.CSSProperties
}

const circleIconStyle: React.CSSProperties = {
  color: colors.SILVER_THREE,
  cursor: 'pointer',
  display: 'block',
  height: 9,
  margin: '0px 4px',
  width: 9,
}
const circleIconSelectedStyle: React.CSSProperties = {
  ...circleIconStyle,
  color: colors.DARK_FOREST_GREEN,
}

interface IconProps {
  isVisible?: boolean
  onClick?: (partnerId: string) => void
  partnerId: string
}
const PartnerIcon = (props: IconProps): React.ReactElement => {
  const {isVisible, onClick, partnerId} = props
  const handleClick = useCallback((): void => {
    if (onClick && partnerId) {
      onClick(partnerId)
    }
  }, [partnerId, onClick])
  return <CircleIcon onClick={handleClick}
    style={isVisible ? circleIconSelectedStyle : circleIconStyle} />
}

const PartnerCard = (props: Props): React.ReactElement => {
  const {description, details, url, isSelected, logo, name, onClick, partnerId,
    stepId, style, title} = props
  const {t} = useTranslation()
  const userCount = usePartnerCount(partnerId)
  const history = useHistory()
  const {email, lastName, name: userName} = useSelector(({firebase: {profile}}) =>
    profile as bayes.maVoie.User)
  const dispatch = useDispatch()
  const finalContainerStyle: React.CSSProperties = {
    ...containerStyle,
    ...style,
  }
  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: isSelected ? '60px 30px 70px' : '0 30px 75px',
  }
  const handleClick = useCallback((): void => {
    if (onClick && partnerId) {
      onClick(partnerId)
    }
  }, [partnerId, onClick])
  const clickPartner = useCallback(async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault()
    const maVoieId = await dispatch(linkPartner(partnerId))
    dispatch(updateSteps({[stepId]: {selectedPartnerId: partnerId}}))
    const parsedUrl = new URL(url)
    const query = new URLSearchParams(parsedUrl.search)
    Object.entries({
      email,
      lastName,
      maVoieId,
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
  }, [dispatch, email, history, lastName, partnerId, stepId, t, url, userName])

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
        </a> : <a
          style={discreetAnchorStyle} rel="noopener noreferrer"
          target="_blank" onClick={clickPartner}>
          <Button type="firstLevel">{t('Découvrir')}</Button>
        </a>}
    </div>
    {isSelected ?
      <div style={topInfoStyle}>{t('En cours')}</div> : userCount ?
        <Trans count={userCount} style={infoStyle}>
          {{userCount}} personne a choisi {{name}}
        </Trans> : null}
  </section>
}
export default React.memo(PartnerCard)
export {PartnerIcon}
