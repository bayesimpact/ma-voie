import _flatMap from 'lodash/flatMap'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector as genericUseSelector} from 'react-redux'
import {useFirestore, useFirestoreConnect} from 'react-redux-firebase'

import {SkillType, getSkills} from 'store/skills'

import {RootState} from './actions'

const emptyArray = [] as const

const useSelector = <T>(selector: (state: RootState) => T): T => genericUseSelector(selector)

const useProjectId = (): string => {
  const projects = useSelector((state) => state.firestore.data.projects)
  if (!projects) {
    return '0'
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

const useStepsUpdater = (): ((updatedStep: bayes.maVoie.Project['steps']) => void) => {
  const firestore = useFirestore()
  const userId = useUserId()
  const projectId = useProjectId()
  const project = useProject()
  const projects = useProjects()
  return useCallback((updatedStep: bayes.maVoie.Project['steps']) => {
    const projectRefConfig = {
      collection: 'users',
      doc: userId,
    }
    const computedProjects: bayes.maVoie.User['projects'] = {
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
  useFirestoreConnect([`partnerCounts/${partnerId}`, 'analytics/counts'])
  return useSelector(({firestore: {data: {analytics, partnerCounts}}}) =>
    analytics?.counts?.[partnerId] || partnerCounts?.[partnerId]?.users || 0)
}

// TODO(cyrille): Use in the new splash.
const useUserCount = (): number => {
  useFirestoreConnect('analytics/counts')
  return useSelector(({firestore: {data: {analytics}}}) => analytics?.counts?.total || 0)
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
  steps: bayes.maVoie.Project['steps'],
): NonNullable<bayes.maVoie.Project['steps']> => {
  const certifiedSteps: Mutable<NonNullable<bayes.maVoie.Project['steps']>> = {}
  _flatMap(identifications, ({partnerId, steps: partnerSteps = []}) => partnerSteps.
    map(step => ({...step, partnerId})).
    filter((step) =>
      // Only keep partnerSteps relevant to this project.
      step.projectId === projectId &&
      // Ignore partners which are not currently selected.
      step.partnerId === steps?.[step.stepId]?.selectedPartnerId)).
    // Sort by increasing registration/validation date.
    sort(sortSteps).
    forEach(({partnerId, registeredAt, stepId, validatedAt}) => {
      certifiedSteps[stepId] = {
        ...validatedAt ? {completed: 'partner'} : registeredAt ? {isStarted: true} : {},
        selectedPartnerId: partnerId,
      }
    })
  // Keep uncertified steps, but completely override steps that are certified.
  return {...steps, ...certifiedSteps}
}

// Get the steps of the current project, with possible partner-certification.
//   Partner certification information is not saved in the user in firestore to avoid
//   users modifying them. This hook returns a `steps` object with the certifications from
//   partners added.
const useCertifiedSteps = (): NonNullable<bayes.maVoie.Project['steps']> => {
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
    () => makeCertifiedSteps(identifications, projectId, steps),
    [identifications, projectId, steps],
  )
  return partnerSteps
}

export {useCertifiedSteps, usePartnerCount, useProject, useProjects, useProjectId,
  useProjectUpdater, useSelector, useSkillsList, useStepsUpdater, useUserId, useUserCount}
