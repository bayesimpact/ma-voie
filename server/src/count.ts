import * as functions from 'firebase-functions'

import {incrementPartnerCount, recomputePartnerCounts} from './firestore'

// TODO(cyrille): Add tests.
export const updateCount = functions.firestore.document('users/{userId}/partners/{partnerId}').
  onCreate(async snapshot => {
    const partnerId = snapshot.get('partnerId')
    if (!partnerId) {
      return
    }
    try {
      await incrementPartnerCount(partnerId)
    } catch (error) {
      functions.logger.error('Unable to update count of partner users', error)
    }
  })

const countSchedule = functions.config().count?.schedule || '5 0 * * *'
export const resetCount = functions.pubsub.schedule(countSchedule).onRun(async () => {
  try {
    await recomputePartnerCounts()
  } catch (error) {
    functions.logger.error('Unable to recompute partner users counts', error)
  }
})
