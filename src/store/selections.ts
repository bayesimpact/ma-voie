import {useSelector as genericUseSelector} from 'react-redux'

import {RootState, createProjectAction, useDispatch} from './actions'

const useSelector = <T>(selector: (state: RootState) => T): T => genericUseSelector(selector)

const useProjectId = (): string => {
  const dispatch = useDispatch()
  const projectId = useSelector(({user: {projects: [{projectId}] = [{}]}}) => projectId)
  if (!projectId) {
    dispatch(createProjectAction)
    return ''
  }
  return projectId
}

export {useProjectId, useSelector}
