import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const FirebaseApp = firebase.initializeApp(config.firebase)
export const FirebaseFirestore = firebase.firestore()
export const FirebaseAuth = FirebaseApp.auth()

export interface FirebaseErrorProps {
  code: string
  message: string
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export {facebookAuthProvider, googleAuthProvider}
