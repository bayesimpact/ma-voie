// Script to export data from Firestore excluding the PII while keeping the important values for
// analytics.
//
// You need to get the service account key file from
// https://console.cloud.google.com/iam-admin/serviceaccounts
// This file has keys in snake case, however TypeScript wants them in camel case, so you'll need
// to fix it.
import admin from 'firebase-admin'
import {promises as fs} from 'fs'
import serviceAccount from './serviceAccountKey.json'

type User = bayes.maVoie.User
type Partner = bayes.maVoie.PartnerIdentification

// List of fields to export with the function to compute the value for each user.
const fields = {
  // Whether the user has a clear job or not.
  hasNoClearJob: (user: unknown, data: User, partners?: Partner[]): string =>
    !!data.projects?.[0]?.hasNoClearJob + '',
  // Their objective.
  objective: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0]?.objective || '',
  jobName: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0]?.job?.jobGroup?.name || '',
  // Steps data
  definitionPartner: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0].steps?.definition?.selectedPartnerId || '',
  definitionCompleted: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0].steps?.definition?.completed || '',
  skillsPartner: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0].steps?.skills?.selectedPartnerId || '',
  skillsCompleted: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0].steps?.skills?.completed || '',
  skills: (user: unknown, data: User): string => data.projects?.[0].skills?.length.toString() || '0',
  trainingPartner: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0].steps?.training?.selectedPartnerId || '',
  trainingCompleted: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0].steps?.training?.completed || '',
  interviewPartner: (user: unknown, data: User, partners?: Partner[]): string => data.projects?.[0].steps?.interview?.selectedPartnerId || '',
  // The time of registration of the user.
  registerTime: (user: admin.firestore.QueryDocumentSnapshot): string =>
    user.createTime.toDate().toISOString(),
  partners: (user: unknown, data: User, partners?: Partner[]): string => {
    return partners?.map(partner => (partner?.steps ? partner.steps[0].stepId + ',' + partner?.partnerId : '')).filter(partner => partner.length > 0).join(',') || ''
  }
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
  await Promise.all(users.docs.map(async user => {
    const data = user.data() as User
    const userPartners = await db.collection('users/' + data.userId + '/partners').get()
    const partners = userPartners.docs.map(doc => doc.data() as Partner)
    await outputFile.write(prepareCsvLine(fieldNames.map(name => fields[name](user, data, partners))))
  }))
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

