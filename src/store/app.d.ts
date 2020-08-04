
// TODO(cyrille): Use protobuffers.
declare namespace bayes {
  namespace maVoie {
    interface User {
      lastName?: string
      name?: string
      projects?: readonly Project[]
    }

    interface Project {
      hasDefinedProject?: boolean
      projectId: string
    }

  }
}