
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

    interface ProjectStep {
      definition?: boolean
      skills?: boolean
      training?: boolean
    }

    interface Project {
      completedSteps?: ProjectStep
      experience?: ProjectExperience
      interest?: ProjectInterest
      hasDefinedProject?: boolean
      objective?: ProjectObjective
      job?: Job
      projectId: string
      skills?: string[]
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
