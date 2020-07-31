import {AllActions} from './actions'

export const user = (state: bayes.maVoie.User = {}, action: AllActions): bayes.maVoie.User => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.user,
      }
    case 'CREATE_PROJECT':
      return {
        ...state,
        projects: [
          ...state.projects || [],
          {projectId: '' + (state.projects?.length || 0)},
        ],
      }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: (state.projects || []).map((project) =>
          project.projectId === action.project.projectId ? {
            ...project,
            ...action.project,
          } : project),
      }
  }
  return state
}
