import CloseIcon from 'mdi-react/CloseIcon'
import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {FirebaseAuth} from 'database/firebase'
import {logoutAction, resetProject, useDispatch, RootState} from 'store/actions'
import {useProject, useProjects, useSelector, useUserId} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'
import {colorToAlpha} from 'components/colors'

import avatarPlaceholder from 'images/avatar-placeholder.svg'
import reloadIcon from 'images/reload-ico.svg'

const isMobileVersion = window.outerWidth < 800

const containerStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_TEAL,
  minHeight: '100vh',
  position: 'relative',
}
const notConnectedCloseStyle: React.CSSProperties = {
  color: '#fff',
  cursor: 'pointer',
  height: 110,
  paddingRight: 15,
  paddingTop: 20,
  textAlign: 'right',
}
const connectedCloseStyle: React.CSSProperties = {
  display: 'flex',
  padding: '30px 20px',
}
const avatarStyle: React.CSSProperties = {
  height: 44,
  width: 44,
}
const userStyle: React.CSSProperties = {
  flex: '1',
  marginLeft: 20,
}
const userNameStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: 16,
  lineHeight: '1.5',
}
const projectsCountStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: 16,
  lineHeight: '1.5',
  opacity: '0.5',
}
const closeStyle: React.CSSProperties = {
  color: '#fff',
  cursor: 'pointer',
}
const jobContainerStyle: React.CSSProperties = {
  backgroundColor: colorToAlpha(colors.DARK_FOREST_GREEN, .5),
}
const jobContentStyle: React.CSSProperties = {
  color: '#fff',
  display: 'flex',
  fontSize: 16,
  fontWeight: 'bold',
  justifyContent: 'space-between',
  padding: '17px 20px 19px',
}
const buttonStyle: React.CSSProperties = {
  margin: '20px 30px 0',
  paddingLeft: 47,
  paddingRight: 44,
}
const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
}
const newAccountDivContainerStyle: React.CSSProperties = {
  bottom: 90,
  position: 'absolute',
  width: '100%',
}
const returnDivContainerStyle: React.CSSProperties = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  width: '100%',
}
const returnDivStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: colorToAlpha(colors.DARK_FOREST_GREEN, .5),
  color: '#fff',
  display: 'flex',
  fontSize: 16,
  height: 55,
  justifyContent: 'center',
}

const projectLinkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
}
const reloadImageStyle: React.CSSProperties = {
  cursor: 'pointer',
  height: 24,
  width: 24,
}

interface MenuProps {
  onClose?: () => void
  style?: React.CSSProperties
}


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const Menu = ({onClose, style}: MenuProps): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const userId = useUserId()
  const {lastName, name} = useSelector(({firebase: {profile}}: RootState) => profile)
  const currentProject = useProject()
  const projects = useProjects()
  const dispatch = useDispatch()

  const isConnected = (userId !== undefined)

  // TODO(émilie): Check if necessary to filter the joblessProject.
  const jobProjects = projects
    ? Object.values(projects).
      filter((project: bayes.maVoie.Project) => project.job !== undefined)
    : null

  const handleLogout = useCallback((): void => {
    dispatch(logoutAction)
    FirebaseAuth.signOut().then(() => history.push(getPath([], t)))
  }, [dispatch, history, t])

  const handleResetClick = useCallback((): void => {
    if (window.confirm(t('Êtes-vous sûr·e de vouloir recommencer à zéro\u00A0?'))) {
      dispatch(resetProject())
    }
  }, [dispatch])

  // TODO(émilie): Add the reset project option.
  return <nav style={{...containerStyle, ...style}}>
    {!isConnected ?
      onClose && <div onClick={onClose} style={notConnectedCloseStyle}>
        <CloseIcon aria-label={t('fermer le menu')} />
      </div>
      : <div style={connectedCloseStyle}>
        <div style={avatarStyle}>
          <img src={avatarPlaceholder} alt="" style={avatarStyle} />
        </div>
        <div style={userStyle}>
          <div style={userNameStyle}>
            <Link to={getPath(['ACCOUNT'], t)} style={linkStyle}>{name} {lastName}</Link>
          </div>
          {jobProjects
            ? jobProjects.length >= 1
              ? <div style={projectsCountStyle}>
                {t('{{count}} projet', {
                  count: jobProjects.length,
                })}
              </div>
              : null
            : null
          }
        </div>
        {onClose && <div onClick={onClose} style={closeStyle}>
          <CloseIcon aria-label={t('fermer le menu')} />
        </div>}
      </div>}
    <div style={jobContainerStyle}>
      {jobProjects
        ? jobProjects.map((project: bayes.maVoie.Project) => {
          const finalProjectStyle = {
            ...jobContentStyle,
            borderLeft: (project.projectId === currentProject.projectId) ? '3px solid #fff' : 0,
          }
          // TODO(émilie): onClick, change current selected project
          return <div style={finalProjectStyle} key={project.projectId}>
            <Link to={getPath(['STEPS'], t)} style={projectLinkStyle}>{project.job?.name}</Link>
            {isMobileVersion ? null :
              <img src={reloadIcon} onClick={handleResetClick} style={reloadImageStyle} alt="" />}
          </div>
        })
        : null
      }
    </div>
    {!isConnected ? <div style={newAccountDivContainerStyle}>
      <Link to={getPath(['ACCOUNT'], t)} style={linkStyle}>
        <Button type="firstLevel" style={buttonStyle}>{t('Créer un compte')}</Button>
      </Link>
    </div> : null}
    <div style={returnDivContainerStyle}>
      <div style={returnDivStyle}>
        {isConnected ?
          <Link to={getPath([], t)} style={linkStyle} onClick={handleLogout}>
            {t('Déconnexion')}
          </Link>
          : <Link to={getPath([], t)} style={linkStyle}>{t('Retour à l\'accueil')}</Link>}
      </div>
    </div>
  </nav>
}

export default React.memo(Menu)
