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
  partner: string,
  userPartnerId: string,
  stepId: string,
  projectId = '0',
): void => {
  const db = admin.firestore()
  db.collectionGroup('partners').
    where('userPartnerId', '==', userPartnerId).
    select().get().then(snapshot => {
      const batch = db.batch()
      snapshot.forEach(doc => {
        const oldSteps: readonly PartnerStep[] = doc.get('steps') || []
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
        batch.update(doc.ref, {steps: alreadyHasStep ? updatedSteps : [...oldSteps, newStep]})
      })
      batch.commit()
    }).catch(error => {
      functions.logger.error('An error occured while updating ' + userPartnerId, error)
    })
}

const registerUser = updateField('registeredAt')
const validateUser = updateField('validatedAt')

export {registerUser, validateUser}
