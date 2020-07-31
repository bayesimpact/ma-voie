import {Action, Dispatch} from 'redux'
import {useDispatch as genericUseDispatch} from 'react-redux'

export type AllActions =
  | UpdateUser

// Type of the main dispatch function.
type DispatchAllActions = Dispatch<AllActions>
export const useDispatch = (): DispatchAllActions => genericUseDispatch<DispatchAllActions>()

interface UpdateUser extends Readonly<Action<'UPDATE_USER'>> {
  user: Partial<bayes.maVoie.User>
}

function updateUser(user: Partial<bayes.maVoie.User>): UpdateUser {
  return {type: 'UPDATE_USER', user}
}

export interface RootState {
  user: bayes.maVoie.User
}

export {updateUser}
