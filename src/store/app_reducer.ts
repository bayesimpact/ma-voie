import {AllActions} from './actions'

export const user = (state: bayes.maVoie.User = {}, action: AllActions): bayes.maVoie.User => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.user,
      }
  }
  return state
}
