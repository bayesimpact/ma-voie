import * as firebase from 'firebase'
import firebaseConfig from 'database/firebase.json'

export const FirebaseApp = firebase.initializeApp(firebaseConfig)

export const FirebaseAuth = FirebaseApp.auth()

export interface FirebaseErrorProp {
  code: string
  message: string
}
