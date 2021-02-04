// TODO(cyrille): Move to top-level, to be used both in client and server.
// TODO(cyrille): Use protobuffers.
declare namespace bayes {
  namespace maVoie {

    type Age =
      | '0-20'
      | '21-25'
      | '26-30'
      | '31-35'
      | '36-40'
      | '41-45'
      | '46-50'
      | '51+'

    type Diploma =
      | 'cap-bep'
      | 'bac'
      | 'bac+2'
      | 'bac+3'
      | 'bac+5'

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
      age?: Age
      areLegalMentionsAccepted?: boolean
      email?: string
      lastName?: string
      name?: string
      userId?: string // Firebase unique ID for authentication
      phone?: string
      jobSeeker?: boolean
      retraining?: boolean
      diploma?: Diploma
    }

    // TODO(cyrille): Set profile as a property of User.
    interface User extends Profile {
      currentProject?: string
      feedback?: boolean
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
      | 'interview'
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
      // This is for incomplete steps which have been recorded as started by a partner.
      isStarted?: boolean
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
      steps?: {readonly [stepId in StepId]?: ProjectStep}
      // TODO(cyrille): Drop, since unused.
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
