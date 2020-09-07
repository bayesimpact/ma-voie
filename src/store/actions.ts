import {Action, Dispatch} from 'redux'
import {useDispatch as genericUseDispatch} from 'react-redux'
import {firebaseReducer} from 'react-redux-firebase'
import {actionTypes, firestoreReducer} from 'redux-firestore'

export type AllActions =
  | Logout
  | ClearData

// Type of the main dispatch function.
export type DispatchAllActions = Dispatch<AllActions>
export const useDispatch = (): DispatchAllActions => genericUseDispatch<DispatchAllActions>()

type Logout = Readonly<Action<'LOGOUT'>>
const logoutAction: Logout = {type: 'LOGOUT'}

export type ClearDataType = '@@reduxFirestore/CLEAR_DATA'
type ClearData = Readonly<Action<ClearDataType>>
const clearDataAction: ClearData = {type: actionTypes.CLEAR_DATA as ClearDataType}

export interface RootState {
  firebase: ReturnType<typeof firebaseReducer>
  firestore: ReturnType<typeof firestoreReducer>
  user: bayes.maVoie.User
}

export {clearDataAction, logoutAction}
