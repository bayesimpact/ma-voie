import firebase from 'firebase/app'

require('firebase/auth')
require('firebase/firestore')

export const FirebaseApp = firebase.initializeApp(JSON.parse(config.firebase))
export const Firestore = firebase.firestore()
export const FirebaseAuth = FirebaseApp.auth()

// eslint-disable-next-line no-console
console.log(JSON.parse(config.firebase))
export interface FirebaseErrorProps {
  code: string
  message: string
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export {facebookAuthProvider, googleAuthProvider}
