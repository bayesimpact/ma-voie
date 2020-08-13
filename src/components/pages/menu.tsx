import CloseIcon from 'mdi-react/CloseIcon'
import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {logoutAction, RootState} from 'store/actions'
import {useProject} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'
import {colorToAlpha} from 'components/colors'
import avatarPlaceholder from 'images/avatar-placeholder.svg'

const notAvailable = (): void => window.alert('Bientôt disponible...')

const pageStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_TEAL,
  height: '100vh',
}
const notConnectedCloseStyle: React.CSSProperties = {
  color: '#fff',
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
}
const jobContainerStyle: React.CSSProperties = {
  backgroundColor: colorToAlpha(colors.DARK_FOREST_GREEN, .5),
}
const jobContentStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  paddingBottom: 19,
  paddingLeft: 20,
  paddingTop: 17,
}
const buttonContainerStyle: React.CSSProperties = {
  margin: '0 30px',
}
const buttonNewStyle: React.CSSProperties = {
  marginTop: 20,
  paddingLeft: 47,
  paddingRight: 44,
}
const buttonStyle: React.CSSProperties = {
  margin: '20px 30px 0',
  paddingLeft: 47,
  paddingRight: 44,
}
const linkStyle: React.CSSProperties = {
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
const linkReturnStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const MenuPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const goBackClick = useCallback((): void => {
    history.goBack()
  }, [history])
  const name = useSelector(({user: {name}}: RootState) => name)
  const lastName = useSelector(({user: {lastName}}: RootState) => lastName)
  const currentProject = useProject()
  const projects = useSelector(({user: {projects}}: RootState) => projects)

  const isConnected = (name !== undefined && lastName !== undefined)

  // TODO(émilie): Check if necessary to filter the joblessProject
  const jobProjects = projects
    ? projects.filter((project: bayes.maVoie.Project) => project.job !== undefined)
    : null

  const dispatch = useDispatch()
  const handleLogout = useCallback((): void => {
    dispatch(logoutAction)
  }, [dispatch])

  return <div style={pageStyle}>
    {!isConnected ?
      <div style={notConnectedCloseStyle}>
        <CloseIcon onClick={goBackClick} />
      </div>
      : <div style={connectedCloseStyle}>
        <div style={avatarStyle}>
          <img src={avatarPlaceholder} alt="" style={avatarStyle} />
        </div>
        <div style={userStyle}>
          <div style={userNameStyle}>{name} {lastName}</div>
          {jobProjects
            ? jobProjects.length >= 1
              ? <div style={projectsCountStyle}>
                {t('{{count}} projet', {
                  count: projects?.filter(
                    (project: bayes.maVoie.Project) => project.job !== undefined).length,
                })}
              </div>
              : null
            : null
          }
        </div>
        <div style={closeStyle}>
          <CloseIcon onClick={goBackClick} />
        </div>
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
            {project.job?.name}
          </div>
        })
        : null
      }
    </div>
    {isConnected
      ? <div style={buttonContainerStyle}>
        <Button type="menu" onClick={notAvailable} style={buttonNewStyle}>
          {t('+ Ajouter un projet')}
        </Button>
      </div>
      : null}
    {!isConnected ? <div style={newAccountDivContainerStyle}>
      <Link to={getPath(['ACCOUNT'], t)} style={linkStyle}>
        <Button type="firstLevel" style={buttonStyle}>{t('Créer un compte')}</Button>
      </Link>
    </div> : null}
    <div style={returnDivContainerStyle}>
      <div style={returnDivStyle}>
        {isConnected ? // TODO(émilie): create the logout action
          <Link to={getPath([], t)} style={linkReturnStyle} onClick={handleLogout}>
            {t('Déconnexion')}
          </Link>
          : <Link to={getPath([], t)} style={linkReturnStyle}>{t('Retour à l\'accueil')}</Link>}
      </div>
    </div>
  </div>
}

export default React.memo(MenuPage)
