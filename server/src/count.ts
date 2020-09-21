import * as functions from 'firebase-functions'

import {incrementUserCount, incrementPartnerCount, recomputeCounts} from './firestore'

// TODO(cyrille): Add tests.
export const updatePartnerCount = functions.firestore.
  document('users/{userId}/partners/{partnerId}').
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

export const updateUserCount = functions.firestore.document('users/{userId}').
  onCreate(incrementUserCount)

const countSchedule = functions.config().count?.schedule || '5 0 * * *'
export const resetCount = functions.pubsub.schedule(countSchedule).onRun(async () => {
  try {
    await recomputeCounts()
  } catch (error) {
    functions.logger.error('Unable to recompute users counts', error)
  }
})
