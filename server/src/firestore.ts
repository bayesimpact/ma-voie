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

export {registerUser, validateUser}
