import {useEffect, useState} from 'react'
import {useSelector as genericUseSelector} from 'react-redux'

import {SkillType, getSkills} from 'store/skills'

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

const getProject = (projectId: string): ((state: RootState) => bayes.maVoie.Project|undefined) =>
  ({user: {projects}}: RootState): bayes.maVoie.Project|undefined =>
    projects?.find(({projectId: pId}) => pId === projectId) || undefined

const useProject = (): bayes.maVoie.Project => {
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const project = useSelector(getProject(projectId))
  if (!project) {
    if (projectId) {
      dispatch(createProjectAction)
    }
    return {projectId}
  }
  return project
}

const useSkillsList = (): readonly SkillType[] => {
  const projectId = useProjectId()
  const romeId = useSelector(state => getProject(projectId)(state)?.job?.jobGroup?.romeId || '')
  const [skills, setSkills] = useState<readonly SkillType[]>([])
  // TODO(cyrille): Cancel the promise when unmounting.
  useEffect((): void => void getSkills(romeId).then(setSkills), [romeId])
  return skills
}

export {useProject, useProjectId, useSelector, useSkillsList}
