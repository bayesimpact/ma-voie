import * as admin from 'firebase-admin'
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
// TODO(cyrille): Replace with a boolean if errors are handled downstream.
type FieldUpdateResult = 'ERROR'|'NOT_FOUND'|'UPDATED'

const updateField = (field: 'registeredAt' | 'validatedAt') => async (
  userPartnerId: string,
  stepId: string,
  projectId = '0',
): Promise<FieldUpdateResult> => {
  const db = admin.firestore()
  const {docs: [partnerStepDoc]} = await db.collectionGroup('partners').
    where('userPartnerId', '==', userPartnerId).limit(1).get()
  if (!partnerStepDoc) {
    return 'NOT_FOUND'
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
  await partnerStepDoc.ref.update({
    steps: alreadyHasStep ? updatedSteps : [...oldSteps, newStep],
  })
  return 'UPDATED'
}

const registerUser = updateField('registeredAt')
const validateUser = updateField('validatedAt')

const incrementPartnerCount = (partnerId: string): Promise<FirebaseFirestore.WriteResult> =>
  admin.firestore().doc('analytics/counts').
    set({[partnerId]: admin.firestore.FieldValue.increment(1)}, {merge: true})

const recomputePartnerCounts = async (): Promise<readonly FirebaseFirestore.WriteResult[]> => {
  const db = admin.firestore()
  // TODO(cyrille): Stop doing it this way if the collection ever gets too big.
  const {docs} = await db.collectionGroup('partners').get()
  const countByPartner: {[partnerId: string]: number} = Object.fromEntries(
    Object.entries(groupBy(docs, doc => doc.data().partnerId)).
      map(([partnerId, docs]) => [partnerId, docs.length]))
  return await Promise.all([
    db.doc('analytics/counts').set(countByPartner, {merge: true}),
    // TODO(cyrille): Drop this once the other one is used in client.
    ...Object.entries(countByPartner).map(([partnerId, users]) =>
      db.doc(`partnerCounts/${partnerId}`).set({users}, {merge: true})),
  ])
}

export {incrementPartnerCount, recomputePartnerCounts, registerUser, validateUser}
