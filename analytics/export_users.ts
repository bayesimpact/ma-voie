// Script to export data from Firestore excluding the PII while keeping the important values for
// analytics.
//
// You need to get the service account key file from
// https://console.cloud.google.com/iam-admin/serviceaccounts
import admin from 'firebase-admin'
import {promises as fs} from 'fs'
import serviceAccount from './serviceAccountKey.json'

type User = bayes.maVoie.User

// List of fields to export with the function to compute the value for each user.
const fields = {
  // Whether the user has a clear job or not.
  hasNoClearJob: (user: unknown, data: User): string =>
    !!data.projects?.[0]?.hasNoClearJob + '',
  // Their objective.
  objective: (user: unknown, data: User): string => data.projects?.[0]?.objective || '',
  // The time of registration of the user.
  registerTime: (user: admin.firestore.QueryDocumentSnapshot): string =>
    user.createTime.toDate().toISOString(),
} as const
const fieldNames = Object.keys(fields) as readonly (keyof typeof fields)[]

const prepareCsvLine = (row: readonly string[]): string =>
  row.map(value => value.includes(',') ? `"${value.replace(/"/g, '\\"')}"` : value).join(',') + '\n'

const exportUsers = async (): Promise<void> => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  const db = admin.firestore()
  const users = await db.collection('users').get()
  const outputFile = await fs.open('out/ma-voie-users.csv', 'w')
  await outputFile.write(prepareCsvLine(fieldNames))
  users.forEach(async (user) => {
    const data = user.data() as User
    await outputFile.write(prepareCsvLine(fieldNames.map(name => fields[name](user, data))))
  })
  outputFile.close()
}

export default exportUsers

if (require.main === module) {
  exportUsers().catch(error => {
    // eslint-disable-next-line no-console
    console.log(error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
}

