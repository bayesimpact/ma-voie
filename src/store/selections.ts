import {useCallback, useEffect, useState} from 'react'
import {useSelector as genericUseSelector} from 'react-redux'
import {useFirestore} from 'react-redux-firebase'

import {SkillType, getSkills} from 'store/skills'

import {RootState} from './actions'

const useSelector = <T>(selector: (state: RootState) => T): T => genericUseSelector(selector)

const useProjectId = (): string => {
  const projects = useSelector((state) => state.firestore.data.projects)
  const userId = useUserId()
  if (!projects) {
    return `${userId}-0`
  }
  const projectKeys = Object.keys(projects)
  return projectKeys[projectKeys.length - 1]
}

const useProjects = (): readonly bayes.maVoie.Project[] => {
  const projects = useSelector((state) => state.firestore.data.projects)
  if (!projects) {
    return []
  }
  return Object.keys(projects).map((key) => projects[key])
}

const getProject = (projectId: string): ((state: RootState) => bayes.maVoie.Project|undefined) =>
  ({user: {projects}}: RootState): bayes.maVoie.Project|undefined =>
    projects?.find(({projectId: pId}) => pId === projectId) || undefined

const useProject = (): bayes.maVoie.Project => {
  const projectId = useProjectId()
  const projects = useSelector((state) => state.firestore.data.projects)
  const userId = useUserId()
  if (!projects?.[projectId]) {
    return {projectId, userId}
  }
  return projects[projectId]
}

const useProjectUpdater = (): ((updatedProject: Partial<bayes.maVoie.Project>) => void) => {
  const firestore = useFirestore()
  const projectId = useProjectId()
  return useCallback((updatedProject: Partial<bayes.maVoie.Project>) => {
    const projectRefConfig = {
      collection: 'projects',
      doc: projectId,
    }
    firestore.update(projectRefConfig, updatedProject).
      catch(() => {
        firestore.set(projectRefConfig, updatedProject)
      })
  }, [firestore, projectId])
}

const useUserId = (): string => {
  return useSelector(({firebase: {auth: {uid}}}: RootState) => uid)
}

const useSkillsList = (): readonly SkillType[] => {
  const projectId = useProjectId()
  const romeId = useSelector(state => getProject(projectId)(state)?.job?.jobGroup?.romeId || '')
  const [skills, setSkills] = useState<readonly SkillType[]>([])
  // TODO(cyrille): Cancel the promise when unmounting.
  useEffect((): void => void getSkills(romeId).then(setSkills), [romeId])
  return skills
}

export {useProject, useProjects, useProjectId, useProjectUpdater,
  useSelector, useSkillsList, useUserId}
