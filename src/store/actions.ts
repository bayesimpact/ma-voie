import {Action, Dispatch} from 'redux'
import {useDispatch as genericUseDispatch} from 'react-redux'
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'

export type AllActions =
  | CreateProject
  | LogoutAction
  | UpdateProject
  | UpdateUser
  | UpdateStep

// Type of the main dispatch function.
export type DispatchAllActions = Dispatch<AllActions>
export const useDispatch = (): DispatchAllActions => genericUseDispatch<DispatchAllActions>()

interface UpdateUser extends Readonly<Action<'UPDATE_USER'>> {
  user: Partial<bayes.maVoie.User>
}

// TODO(émilie): Delete as it is no more used.
function updateUser(user: Partial<bayes.maVoie.User>): UpdateUser {
  return {type: 'UPDATE_USER', user}
}

type CreateProject = Readonly<Action<'CREATE_PROJECT'>>
const createProjectAction: CreateProject = {type: 'CREATE_PROJECT'}

interface UpdateProject extends Readonly<Action<'UPDATE_PROJECT'>> {
  project: Partial<bayes.maVoie.Project> & {projectId: string}
}
// TODO(émilie): Delete as it is no more used.
function updateProject(project: UpdateProject['project']): UpdateProject {
  return {project, type: 'UPDATE_PROJECT'}
}

interface UpdateStep extends Readonly<Action<'UPDATE_STEP'>> {
  readonly projectId: string
  readonly stepId: bayes.maVoie.StepId
  readonly step: Partial<bayes.maVoie.ProjectStep>
}
// TODO(émilie): Delete as it is no more used.
function updateStep(
  projectId: string, stepId: bayes.maVoie.StepId, step: UpdateStep['step']): UpdateStep {
  return {projectId, step, stepId, type: 'UPDATE_STEP'}
}

export type LogoutAction = Readonly<Action<'LOGOUT'>>
const logoutAction: LogoutAction = {type: 'LOGOUT'}

export interface RootState {
  firebase: ReturnType<typeof firebaseReducer>
  firestore: ReturnType<typeof firestoreReducer>
  user: bayes.maVoie.User
}

export {createProjectAction, logoutAction, updateProject, updateStep, updateUser}
