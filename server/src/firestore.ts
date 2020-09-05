import * as admin from 'firebase-admin'

admin.initializeApp()

const registerUser = (
  unusedPartner: string,
  unusedUserPartnerId: string,
  unusedStepId: string,
): void => {
  // FIXME(cyrille): Fetch user from Firestore, and save the registration.
}

const validateUser = (
  unusedPartner: string,
  unusedUserPartnerId: string,
  unusedStepId: string,
): void => {
  // FIXME(cyrille): Fetch user from Firestore, and save the validation.
}

const updatePartnerCount = (partnerId: string): void => {
  const db = admin.firestore()
  db.doc(`partnerCounts/${partnerId}`).update({users: admin.firestore.FieldValue.increment(1)})
}

export {registerUser, updatePartnerCount, validateUser}
