import * as functions from 'firebase-functions'

import {incrementPartnerCount, recomputePartnerCounts} from './firestore'

// TODO(cyrille): Add tests.
export const updateCount = functions.firestore.document('user/{userId}/partners/{partnerId}').
  onWrite(({after: {data: getDocument}, before: {exists: isUpdate}}) => {
    if (isUpdate) {
      return
    }
    const {partnerId, userPartnerId} = getDocument() || {}
    if (!partnerId || !userPartnerId) {
      return
    }
    incrementPartnerCount(partnerId)
  })

const countSchedule = functions.config().count?.schedule || '5 0 * * *'
export const resetCount = functions.pubsub.schedule(countSchedule).
  onRun(recomputePartnerCounts)
