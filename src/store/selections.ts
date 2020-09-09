import _flatMap from 'lodash/flatMap'
import _merge from 'lodash/merge'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector as genericUseSelector} from 'react-redux'
import {useFirestore, useFirestoreConnect} from 'react-redux-firebase'

import {SkillType, getSkills} from 'store/skills'

import {RootState} from './actions'

const emptyArray = [] as const

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

const usePartnerCount = (partnerId: string): number => {
  const countListener = useMemo(() => ({
    collection: 'partnerCounts',
    doc: partnerId,
  }), [partnerId])
  useFirestoreConnect(countListener)
  return useSelector(({firestore: {data: {partnerCounts}}}) =>
    partnerCounts?.[partnerId]?.users || 0)
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

/*
 * Create steps that are certified by a partner.
 */
// Export is for test purposes only.
export const makeCertifiedSteps = (
  identifications: readonly bayes.maVoie.PartnerIdentification[],
  projectId: string,
): bayes.maVoie.Project['steps'] => {
  const certifiedSteps: Mutable<NonNullable<bayes.maVoie.Project['steps']>> = {}
  _flatMap(identifications, ({partnerId, steps = []}) => steps.
    map(step => ({...step, partnerId})).
    // Only keep partnedSteps relevant to this project.
    filter((step) => step.projectId === projectId)).
    // Sort by increasing registration/validation date.
    sort(sortSteps).
    forEach(({partnerId, registeredAt, stepId, validatedAt}) => {
      certifiedSteps[stepId] = {
        ...validatedAt ? {completed: 'partner'} : registeredAt ? {isStarted: true} : {},
        selectedPartnerId: partnerId,
      }
    })
  return certifiedSteps
}

// Get the steps of the current project, with possible partner-certification.
//   Partner certification information is not saved in the user in firestore to avoid
//   users modifying them. This hook returns a `steps` object with the certifications from
//   partners added.
const useCertifiedSteps = (): bayes.maVoie.Project['steps'] => {
  const userId = useUserId()
  const projectId = useProjectId()
  const {steps} = useProject()
  useFirestoreConnect(userId ? {
    collection: 'users',
    doc: userId,
    storeAs: 'partners',
    subcollections: [{collection: 'partners'}],
  } : [])
  const identifications: readonly bayes.maVoie.PartnerIdentification[] =
    useSelector(({firestore: {data: {partners}}}) => partners || emptyArray)
  const partnerSteps = useMemo(
    () => makeCertifiedSteps(identifications, projectId),
    [identifications, projectId],
  )
  return useMemo(() => _merge(steps, partnerSteps), [partnerSteps, steps])
}

export {useCertifiedSteps, usePartnerCount, useProject, useProjects, useProjectId,
  useProjectUpdater, useSelector, useSkillsList, useStepUpdater, useUserId}
