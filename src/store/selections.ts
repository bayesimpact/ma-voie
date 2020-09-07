import _flatMap from 'lodash/flatMap'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector as genericUseSelector} from 'react-redux'
import {useFirestore, useFirestoreConnect} from 'react-redux-firebase'

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

const useProjects = (): bayes.maVoie.User['projects'] => {
  return useSelector(({firebase: {profile: {projects}}}: RootState) => projects)
}

const useProject = (): bayes.maVoie.Project => {
  const projectId = useProjectId()
  const projects = useSelector(({firebase: {profile: {projects}}}: RootState) => projects)
  const userId = useUserId()
  if (!projects || !projects[projectId]) {
    return {projectId, userId}
  }
  return projects[projectId]
}

const useProjectUpdater = (): ((updatedProject: Partial<bayes.maVoie.Project>) => void) => {
  const firestore = useFirestore()
  const userId = useUserId()
  const projectId = useProjectId()
  const project = useProject()
  const projects = useProjects()
  return useCallback((updatedProject: Partial<bayes.maVoie.Project>) => {
    const projectRefConfig = {
      collection: 'users',
      doc: userId,
    }
    const computedProjects = {
      ...projects,
      [projectId]: {...project, ...updatedProject},
    }
    firestore.update(projectRefConfig, {projects: computedProjects})
  }, [firestore, project, projectId, projects, userId])
}

const useStepUpdater = (): ((updatedStep: Partial<bayes.maVoie.ProjectStep>) => void) => {
  const firestore = useFirestore()
  const userId = useUserId()
  const projectId = useProjectId()
  const project = useProject()
  const projects = useProjects()
  return useCallback((updatedStep: Partial<bayes.maVoie.ProjectStep>) => {
    const projectRefConfig = {
      collection: 'users',
      doc: userId,
    }
    const computedProjects = {
      ...projects,
      [projectId]: {
        ...project,
        steps: {...project.steps, ...updatedStep},
      },
    }
    firestore.update(projectRefConfig, {projects: computedProjects})
  }, [firestore, project, projectId, projects, userId])
}

// TODO(cyrille): Move at the top of the file.
const useUserId = (): string => {
  return useSelector(({firebase: {auth: {uid}}}: RootState) => uid)
}

const useSkillsList = (): readonly SkillType[] => {
  const projects = useSelector(({firebase: {profile: {projects}}}: RootState) => projects)
  const projectId = useProjectId()
  const project = projects?.[projectId]
  const romeId = project?.job?.jobGroup?.romeId || ''
  const [skills, setSkills] = useState<readonly SkillType[]>([])
  // TODO(cyrille): Cancel the promise when unmounting.
  useEffect((): void => void getSkills(romeId).then(setSkills), [romeId])
  return skills
}

const sortSteps = (first: bayes.maVoie.PartnerStep, second: bayes.maVoie.PartnerStep): number => {
  if (first.validatedAt && second.validatedAt) {
    return first.validatedAt < second.validatedAt ? -1 : 1
  }
  if (second.validatedAt) {
    return 1
  }
  if (first.registeredAt && second.registeredAt) {
    return first.registeredAt < second.registeredAt ? -1 : 1
  }
  return second.registeredAt ? 1 : -1
}

const useCertifiedSteps = (): bayes.maVoie.Project['steps'] => {
  const userId = useUserId()
  const projectId = useProjectId()
  const connectConfig = useMemo(() => userId ? {
    collection: 'users',
    doc: userId,
    storeAs: 'partners',
    subcollections: [{collection: 'partners'}],
  } : [], [userId])
  const {steps} = useProject()
  const partnerSteps: bayes.maVoie.Project['steps'] = {}
  useFirestoreConnect(connectConfig)
  const identifications: readonly bayes.maVoie.PartnerIdentification[] =
    useSelector(({firestore: {data: {partners}}}) => partners || [])
  _flatMap(identifications, ({partnerId, steps = []}) => steps.
    map(step => ({...step, partnerId})).
    // Only keep partnedSteps relevant to this project.
    filter((step) => step.projectId === projectId)).
    // Sort by increasing registration/validation date.
    sort(sortSteps).
    forEach(({partnerId, registeredAt, stepId, validatedAt}) => {
      partnerSteps[stepId] = {
        ...validatedAt ? {completed: 'partner'} : registeredAt ? {started: true} : {},
        selectedPartnerId: partnerId,
      }
    })
  return {
    ...steps,
    ...partnerSteps,
  }
}

export {useCertifiedSteps, useProject, useProjects, useProjectId, useProjectUpdater,
  useSelector, useSkillsList, useStepUpdater, useUserId}
