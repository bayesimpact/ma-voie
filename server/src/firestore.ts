import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {groupBy} from 'lodash'

admin.initializeApp()

// TODO(cyrille): use the one from app.d.ts
interface PartnerStep {
  stepId: string
  projectId: string
  registeredAt?: string
  validatedAt?: string
}

// TODO(cyrille): Consider giving more feedback in the response.
type FieldUpdateResult = 'ERROR'|'NOT_FOUND'|'UPDATED'

const updateField = (field: 'registeredAt' | 'validatedAt') => (
  userPartnerId: string,
  stepId: string,
  projectId = '0',
): Promise<FieldUpdateResult> => {
  const db = admin.firestore()
  return db.collectionGroup('partners').
    where('userPartnerId', '==', userPartnerId).
    limit(1).get().then(({docs: [partnerStepDoc]}): Promise<FieldUpdateResult> => {
      if (!partnerStepDoc) {
        return Promise.resolve('NOT_FOUND')
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
      }).then(() => 'UPDATED')
    }).catch(error => {
      functions.logger.error('An error occured while updating ' + userPartnerId, error)
      return 'ERROR'
    })
}

const registerUser = updateField('registeredAt')
const validateUser = updateField('validatedAt')

const incrementPartnerCount = (partnerId: string): void => {
  const db = admin.firestore()
  db.doc(`partnerCounts/${partnerId}`).set(
    {users: admin.firestore.FieldValue.increment(1)},
    {merge: true},
  )
}

const recomputePartnerCounts = (): void => {
  const db = admin.firestore()
  // TODO(cyrille): Stop doing it this way if the collection ever gets too big.
  db.collectionGroup('partners').get().then(snapshot => {
    Object.entries(groupBy(snapshot.docs, doc => doc.data().partnerId)).
      forEach(([partnerId, docs]) => {
        db.doc(`partnerCounts/${partnerId}`).set({users: docs.length}, {merge: true})
      })
  })
}

export {incrementPartnerCount, recomputePartnerCounts, registerUser, validateUser}
