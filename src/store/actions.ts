import {Action, Dispatch} from 'redux'
import {useDispatch as genericUseDispatch} from 'react-redux'

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

function updateUser(user: Partial<bayes.maVoie.User>): UpdateUser {
  return {type: 'UPDATE_USER', user}
}

type CreateProject = Readonly<Action<'CREATE_PROJECT'>>
const createProjectAction: CreateProject = {type: 'CREATE_PROJECT'}

interface UpdateProject extends Readonly<Action<'UPDATE_PROJECT'>> {
  project: Partial<bayes.maVoie.Project> & {projectId: string}
}
function updateProject(project: UpdateProject['project']): UpdateProject {
  return {project, type: 'UPDATE_PROJECT'}
}

interface UpdateStep extends Readonly<Action<'UPDATE_STEP'>> {
  readonly projectId: string
  readonly stepId: bayes.maVoie.StepId
  readonly step: Partial<bayes.maVoie.ProjectStep>
}
function updateStep(
  projectId: string, stepId: bayes.maVoie.StepId, step: UpdateStep['step']): UpdateStep {
  return {projectId, step, stepId, type: 'UPDATE_STEP'}
}

export type LogoutAction = Readonly<Action<'LOGOUT'>>
const logoutAction: LogoutAction = {type: 'LOGOUT'}

export interface RootState {
  user: bayes.maVoie.User
}

export {createProjectAction, logoutAction, updateProject, updateStep, updateUser}
