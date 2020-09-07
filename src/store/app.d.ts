// TODO(cyrille): Move to top-level, to be used both in client and server.
// TODO(cyrille): Use protobuffers.
declare namespace bayes {
  namespace maVoie {

    interface PartnerStep {
      projectId?: string
      registeredAt?: string
      stepId: StepId
      validatedAt?: string
    }

    interface PartnerIdentification {
      partnerId: string
      steps?: readonly PartnerStep[]
      userPartnerId: string
    }

    interface Profile {
      email?: string
      lastName?: string
      name?: string
      userId?: string // Firebase unique ID for authentication
    }

    // TODO(cyrille): Set profile as a property of User.
    interface User extends Profile {
      partners?: readonly PartnerIdentification[]
      projects?: {
        [projectId: string]: Project
      }
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
      // This is for incomplete steps which have been recorded as started by a partner.
      started?: boolean
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
      userId?: string
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
