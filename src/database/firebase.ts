import * as firebase from 'firebase'
import firebaseConfig from 'database/firebase.json'

export const FirebaseApp = firebase.initializeApp(firebaseConfig)

export const FirebaseAuth = FirebaseApp.auth()

export interface FirebaseErrorProps {
  code: string
  message: string
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export {facebookAuthProvider, googleAuthProvider}
