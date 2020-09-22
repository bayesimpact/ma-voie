import {UserCredential} from '@firebase/auth-types'
import {Action, Dispatch} from 'redux'
import {useDispatch as genericUseDispatch} from 'react-redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {Credentials, FirebaseReducer, FirestoreReducer, getFirebase} from 'react-redux-firebase'
import {actionTypes} from 'redux-firestore'

export type AllActions =
  | AuthenticateUser
  | ClearData
  | Logout
  | UpdateProject

// Type of the main dispatch function.
export type DispatchAllActions =
  & ThunkDispatch<RootState, unknown, AllActions>
  & Dispatch<AllActions>

export const useDispatch: () => DispatchAllActions = genericUseDispatch

type Logout = Readonly<Action<'LOGOUT'>>
const logoutAction: Logout = {type: 'LOGOUT'}

export type ClearDataType = '@@reduxFirestore/CLEAR_DATA'
type ClearData = Readonly<Action<ClearDataType>>
const clearDataAction: ClearData = {type: actionTypes.CLEAR_DATA as ClearDataType}

interface PasswordAuthentication {
  email: string
  password: string
  provider: 'password'
}

interface ProviderAuthentication {
  provider: 'facebook' | 'google'
}
type Authentication = PasswordAuthentication | ProviderAuthentication
type AuthenticateUser = Readonly<Action<'AUTHENTICATE_USER'>> & Omit<Authentication, 'type'>
function authenticateUser(auth: Authentication):
ThunkAction<Promise<UserCredential>, RootState, unknown, AuthenticateUser> {
  return async (dispatch): Promise<UserCredential> => {
    const firebase = getFirebase()
    const firebaseAuth: Credentials = auth.provider === 'password' ?
      {email: auth.email, password: auth.password} :
      {...auth, type: 'popup'}
    dispatch({...auth, type: 'AUTHENTICATE_USER'})
    const response = await firebase.login(firebaseAuth)
    if (!response) {
      throw new Error('Authentication failed for an unknown reason')
    }
    if (auth.provider !== 'password') {
      return response as UserCredential
    }
    // TODO(émilie): response is of the form {user: UserCredential} but has type UserCredential
    // in Typescript. Correct this when the bug is solved (as in Google/Facebook login).
    // See https://github.com/prescottprue/react-redux-firebase/issues/996
    if (!response.user) {
      throw new Error('Authentication failed for an unknown reason')
    }
    return response.user as unknown as UserCredential
  }
}

export interface UpdateProject extends Readonly<Action<'UPDATE_PROJECT'>> {
  project: Partial<bayes.maVoie.Project>
}

function updateProject(project: Partial<bayes.maVoie.Project>):
ThunkAction<Promise<void>, RootState, unknown, UpdateProject> {
  return async (dispatch, getState): Promise<void> => {
    dispatch({project, type: 'UPDATE_PROJECT'})
    const {firebase: {profile: {currentProject: projectId = '0', projects}}} = getState()
    const firebase = getFirebase()
    await firebase.updateProfile({
      projects: {
        ...projects,
        [projectId]: {
          ...projects?.[projectId],
          ...project,
        },
      },
    })
  }
}

export interface RootState {
  firebase: FirebaseReducer.Reducer<bayes.maVoie.User>
  firestore: FirestoreReducer.Reducer
  user: bayes.maVoie.User
}

export {clearDataAction, authenticateUser, logoutAction, updateProject}
