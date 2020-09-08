import * as functions from 'firebase-functions'

import {incrementPartnerCount, recomputePartnerCounts} from './firestore'

// TODO(cyrille): Add tests.
export const updateCount = functions.firestore.document('user/{userId}/partners/{partnerId}').
  onWrite(async ({after: {data: getDocument}, before: {exists: isUpdate}}) => {
    if (isUpdate) {
      return
    }
    const {partnerId, userPartnerId} = getDocument() || {}
    if (!partnerId || !userPartnerId) {
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
