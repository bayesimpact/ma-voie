import Storage from 'local-storage-fallback'
import {Middleware, MiddlewareAPI} from 'redux'
import {AllActions, DispatchAllActions, RootState} from './actions'


const USER_IN_LOCAL_STORAGE = 'user'
const initialUser: bayes.maVoie.User =
  JSON.parse(Storage.getItem(USER_IN_LOCAL_STORAGE) || '{}') || {}

export const user = (state = initialUser, action: AllActions): bayes.maVoie.User => {
  switch (action.type) {
    case 'LOGOUT':
      return {}
  }
  return state
}

type MiddlewareReturnType<State> = ReturnType<Middleware<unknown, State, DispatchAllActions>>

export const localStorageMiddleware: Middleware<unknown, RootState, DispatchAllActions> =
  (store: MiddlewareAPI<DispatchAllActions, RootState>): MiddlewareReturnType<RootState> =>
    (next: DispatchAllActions): ReturnType<MiddlewareReturnType<RootState>> =>
      (action: AllActions): ReturnType<ReturnType<MiddlewareReturnType<RootState>>> => {
        const result = next(action)
        const {user} = store.getState()
        Storage.setItem(USER_IN_LOCAL_STORAGE, JSON.stringify(user))
        return result
      }
