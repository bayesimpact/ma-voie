
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
      job?: Job
      projectId: string
    }

    interface Job {
      codeOgr?: string
      jobGroup?: JobGroup
      name?: string
    }

    interface JobGroup {
      name?: string
      romeId?: string
    }

  }
}
