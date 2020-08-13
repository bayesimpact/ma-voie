
// TODO(cyrille): Use protobuffers.
declare namespace bayes {
  namespace maVoie {

    interface Profile {
      email?: string
      lastName?: string
      name?: string
    }

    // TODO(cyrille): Set profile as a property of User.
    interface User extends Profile {
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
