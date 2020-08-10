import {useSelector as genericUseSelector} from 'react-redux'

import {RootState, createProjectAction, useDispatch} from './actions'

const useSelector = <T>(selector: (state: RootState) => T): T => genericUseSelector(selector)

const useProjectId = (): string => {
  const dispatch = useDispatch()
  const projectId = useSelector(({user: {projects: [{projectId}] = [{}]}}) => projectId)
  if (!projectId) {
    dispatch(createProjectAction)
    return ''
  }
  return projectId
}

const useProject = (): bayes.maVoie.Project => {
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const projects = useSelector(({user: {projects}}: RootState) => projects)
  if (!projects) {
    return {projectId: ''}
  }
  const project = projects.find((project) => project.projectId === projectId)
  if (!project) {
    dispatch(createProjectAction)
    return <bayes.maVoie.Project>{}
  }
  return project
}

export {useProject, useProjectId, useSelector}
