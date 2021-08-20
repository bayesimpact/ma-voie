/* A script to upload a partner info to firestore.
 *
 * First, get a service account key in https://console.firebase.google.com/u/0/project/ma-voie/settings/serviceaccounts/adminsdk
 * and save it as credentials/serviceAccountKey.json
 *
 * Then run `npm run upload -- partner-id`
 *
 * This will upload the partner with the given ID as a document in firestore in production.
 * The newly created document has its partnerId as ID.
 *
 * To upload to demo or dev, simply use a relevant serviceAccountKey.json.
 */
/* eslint-disable no-console */
import admin from 'firebase-admin'

import partners from './partners.json'

const partnerId = process.argv[2]
console.log(`Starting to upload ${partnerId}...`)
if (!partnerId) {
  console.error('You must specify a partner to upload')
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1)
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

console.log('App initialized');

(async (): Promise<void> => {
  const partner = partners.find(({partnerId: pId}: {partnerId: string}) => pId === partnerId)
  if (!partner) {
    console.error(
      `Could not find a partner with ID ${partnerId}. Choose one from`,
      partners.map(({partnerId}) => partnerId),
    )
    return
  }
  const db = admin.firestore()
  try {
    await db.collection('staticPartners').doc(partnerId).set(partner)
    console.log(`Partner ${partnerId} has been uploaded to firestore.`)
  } catch (error) {
    console.error(`An error occurred while uploading partner ${partnerId}`, error)
  }
})()
