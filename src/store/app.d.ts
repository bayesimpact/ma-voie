
// TODO(cyrille): Use protobuffers.
declare namespace bayes {
  namespace maVoie {

    interface PartnerIdentification {
      partnerId: string
      userPartnerId: string
      projectId?: string
      registeredAt?: string
      stepId: StepId
      validatedAt?: string
    }

    interface Profile {
      email?: string
      lastName?: string
      name?: string
      // TODO(émilie): Rename uid to userId.
      uid?: string // Firebase unique ID for authentication
    }

    // TODO(cyrille): Set profile as a property of User.
    interface User extends Profile {
      partners?: readonly PartnerIdentification[]
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
    type StepCertificate =
      | 'notRequired'
      | 'self'
      | 'partner'

    type StepId =
      | 'definition'
      | 'skills'
      | 'training'
      | 'interview'

    interface ProjectStep {
      // undefined means not certified yet
      completed?: StepCertificate
      selectedPartnerId?: string
    }

    interface Project {
      experience?: ProjectExperience
      interest?: ProjectInterest
      hasDefinedProject?: boolean
      hasNoClearJob?: boolean
      objective?: ProjectObjective
      job?: Job
      projectId: string
      skills?: readonly string[]
      steps?: {[stepId in StepId]?: ProjectStep}
      uid?: string
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
