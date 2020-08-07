
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
    type ProjectObjective =
      | 'job'
      | 'training'

    interface Project {
      canStepInterview?: boolean
      canStepSkills?: boolean
      experience?: ProjectExperience
      hasDefinedProject?: boolean
      objective?: ProjectObjective
      projectId: string
    }

  }
}
