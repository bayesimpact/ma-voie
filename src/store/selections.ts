import {useEffect, useState} from 'react'
import {useSelector as genericUseSelector} from 'react-redux'

import {SkillType, getSkills} from 'store/skills'

import {RootState} from './actions'

const useSelector = <T>(selector: (state: RootState) => T): T => genericUseSelector(selector)

const useProjectId = (): string => {
  const projects = useSelector((state) => state.firestore.data.projects)
  const uid = useSelector(({firebase: {auth: {uid}}}: RootState) => uid)
  if (!projects) {
    return `${uid}-0`
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
  const uid = useSelector(({firebase: {auth: {uid}}}: RootState) => uid)
  if (!projects?.[projectId]) {
    return {projectId, uid}
  }
  return projects[projectId]
}

interface DocRefConfig {
  collection: string
  doc: string
}

const useProjectDocRefConfig = (): DocRefConfig => {
  return {
    collection: 'projects',
    doc: useProjectId(),
  }
}

const useSkillsList = (): readonly SkillType[] => {
  const projectId = useProjectId()
  const romeId = useSelector(state => getProject(projectId)(state)?.job?.jobGroup?.romeId || '')
  const [skills, setSkills] = useState<readonly SkillType[]>([])
  // TODO(cyrille): Cancel the promise when unmounting.
  useEffect((): void => void getSkills(romeId).then(setSkills), [romeId])
  return skills
}

export {useProject, useProjects, useProjectDocRefConfig, useProjectId, useSelector, useSkillsList}
