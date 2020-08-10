
// TODO(cyrille): Use protobuffers.
declare namespace bayes {
  namespace maVoie {
    interface User {
      lastName?: string
      name?: string
      projects?: readonly Project[]
    }

    type ProjectExperience =
      | 'new'
      | '1-3'
      | '3-5'
      | '5'
    type ProjectInterest =
      | 'exciting'
      | 'indifferent'
      | 'interesting'
    type ProjectObjective =
      | 'job'
      | 'training'

    interface Project {
      experience?: ProjectExperience
      interest?: ProjectInterest
      hasDefinedProject?: boolean
      projectId: string
    }

  }
}
