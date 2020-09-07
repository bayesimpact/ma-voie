import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp()

// TODO(cyrille): use the one from app.d.ts
interface PartnerStep {
  stepId: string
  projectId: string
  registeredAt?: string
  validatedAt?: string
}

const updateField = (field: 'registeredAt' | 'validatedAt') => (
  userPartnerId: string,
  stepId: string,
  projectId = '0',
): Promise<unknown> => {
  const db = admin.firestore()
  return db.collectionGroup('partners').
    where('userPartnerId', '==', userPartnerId).
    limit(1).get().then(({docs: [partnerStepDoc]}) => {
      if (!partnerStepDoc) {
        // TODO(cyrille): Return a 404.
        return
      }
      const oldSteps: readonly PartnerStep[] = partnerStepDoc.get('steps') || []
      const newStep: PartnerStep = {[field]: new Date().toISOString(), projectId, stepId}
      let alreadyHasStep = false
      const updatedSteps = oldSteps.map(step => {
        if (step.stepId === stepId && step.projectId === projectId) {
          alreadyHasStep = true
          // Only add `field` if it wasn't already there.
          return {...newStep, ...step}
        }
        return step
      })
      return partnerStepDoc.ref.update({
        steps: alreadyHasStep ? updatedSteps : [...oldSteps, newStep],
      })
    }).catch(error => {
      functions.logger.error('An error occured while updating ' + userPartnerId, error)
    })
}

const registerUser = updateField('registeredAt')
const validateUser = updateField('validatedAt')

const incrementPartnerCount = (partnerId: string): void => {
  const db = admin.firestore()
  db.doc(`partnerCounts/${partnerId}`).update({users: admin.firestore.FieldValue.increment(1)})
}

export {incrementPartnerCount, registerUser, validateUser}
