import {UserCredential} from '@firebase/auth-types'
import {CallHistoryMethodAction, RouterState, push} from 'connected-react-router'
import {TFunction} from 'i18next'
import {getI18n} from 'react-i18next'
import {useDispatch as genericUseDispatch} from 'react-redux'
import {Action, Dispatch} from 'redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {Credentials, FirebaseReducer, FirestoreReducer, getFirebase}
  from 'react-redux-firebase'
import {actionTypes} from 'redux-firestore'
import sha1 from 'sha1'

import {getPath} from 'store/url'

export type AllActions =
  | AuthenticateUser
  | CallHistoryMethodAction
  | ClearData
  | LinkPartner
  | Logout
  | UpdateProject
  | UpdateSteps

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
ThunkAction<Promise<UserCredential>, RootState, unknown, AllActions> {
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
    dispatch(push(getPath(['STEPS'], (...args: Parameters<TFunction>) => getI18n().t(...args))))
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
          projectId,
          ...projects?.[projectId],
          ...project,
        },
      },
    })
  }
}

const resetProjectAction = ():
ThunkAction<Promise<void>, RootState, unknown, Readonly<Action<'RESET_PROJECT'>>> => {
  return async (dispatch, getState): Promise<void> => {
    dispatch({type: 'RESET_PROJECT'})
    const {firebase: {profile: {currentProject: projectId = '0', projects}}} = getState()
    const firebase = getFirebase()
    await firebase.updateProfile({
      projects: {
        ...projects,
        [projectId]: {},
      },
    })
  }
}

interface UpdateSteps extends Readonly<Action<'UPDATE_STEPS'>> {
  steps: NonNullable<bayes.maVoie.Project['steps']>
}

function updateSteps(steps: UpdateSteps['steps']):
ThunkAction<Promise<void>, RootState, unknown, UpdateSteps> {
  return async (dispatch, getState): Promise<void> => {
    dispatch({steps, type: 'UPDATE_STEPS'})
    const {firebase: {profile: {currentProject: projectId = '0', projects}}} = getState()
    const firebase = getFirebase()
    await firebase.updateProfile({
      projects: {
        ...projects,
        [projectId]: {
          ...projects?.[projectId],
          steps: {
            ...projects?.[projectId]?.steps,
            ...steps,
          },
        },
      },
    })
  }
}

interface LinkPartner extends Readonly<Action<'LINK_PARTNER'>> {
  partnerId: string
  userPartnerId: string
}

function linkPartner(partnerId: string):
ThunkAction<Promise<string>, RootState, unknown, LinkPartner> {
  return async (dispatch, getState): Promise<string> => {
    const {firebase: {auth: {uid: userId}}, firestore: {ordered: {partners = []}}} = getState()
    const {userPartnerId: existingId} =
      partners.find((partner: bayes.maVoie.PartnerIdentification) =>
        partner.partnerId === partnerId) || {}
    if (existingId) {
      return existingId
    }
    const userPartnerId = sha1(userId + partnerId)
    dispatch({partnerId, type: 'LINK_PARTNER', userPartnerId})
    await getFirebase().firestore().
      collection('users').
      doc(userId).
      collection('partners').
      doc(userPartnerId).
      set({
        partnerId,
        userPartnerId,
      })
    return userPartnerId
  }
}

const calendlyClickAction:
ThunkAction<Promise<void>, RootState, unknown, Readonly<Action<'REQUEST_CALENDLY_CONTACT'>>> =
  async (dispatch): Promise<void> => {
    const firestore = getFirebase().firestore
    await getFirebase().firestore().
      doc('analytics/calendly').
      set({value: firestore.FieldValue.increment(1)}, {merge: true}).
      then(() => dispatch({type: 'REQUEST_CALENDLY_CONTACT'}))
  }

const feedbackClickAction:
ThunkAction<Promise<void>, RootState, unknown, Readonly<Action<'FEEDBACK_CLICK'>>> =
  async (dispatch): Promise<void> => {
    getFirebase().updateProfile({feedback: true}).then(() => dispatch({type: 'FEEDBACK_CLICK'}))
  }

export interface RootState {
  firebase: FirebaseReducer.Reducer<bayes.maVoie.User>
  firestore: FirestoreReducer.Reducer
  router: RouterState<unknown>
  user: bayes.maVoie.User
}

export {calendlyClickAction, clearDataAction, authenticateUser, feedbackClickAction, linkPartner,
  logoutAction, resetProjectAction, updateProject, updateSteps}
