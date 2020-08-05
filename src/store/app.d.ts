
// TODO(cyrille): Use protobuffers.
declare namespace bayes {
  namespace maVoie {
    interface User {
      lastName?: string
      name?: string
      projects?: readonly Project[]
    }

    interface Project {
      experience?: 'new' | '1-3' | '3-5' | '5'
      hasDefinedProject?: boolean
      objective?: 'job' | 'training'
      projectId: string
    }

  }
}
