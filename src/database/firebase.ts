import firebase from 'firebase/app'

require('firebase/auth')
require('firebase/firestore')

export const FirebaseApp = firebase.initializeApp(config.firebase)
export const Firestore = firebase.firestore()
export const FirebaseAuth = FirebaseApp.auth()

export interface FirebaseErrorProps {
  code: string
  message: string
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export {facebookAuthProvider, googleAuthProvider}
