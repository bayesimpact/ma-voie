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

const incrementPartnerCount = (partnerId: string): void => {
  const db = admin.firestore()
  db.doc(`partnerCounts/${partnerId}`).update({users: admin.firestore.FieldValue.increment(1)})
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
