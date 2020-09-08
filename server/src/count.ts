import * as functions from 'firebase-functions'

import {incrementPartnerCount, recomputePartnerCounts} from './firestore'

// TODO(cyrille): Add tests.
export const updateCount = functions.firestore.document('users/{userId}/partners/{partnerId}').
  onCreate(snapshot => {
    const partnerId = snapshot.get('partnerId')
    if (!partnerId) {
      return
    }
    incrementPartnerCount(partnerId)
  })

const countSchedule = functions.config().count?.schedule || '5 0 * * *'
export const resetCount = functions.pubsub.schedule(countSchedule).
  onRun(recomputePartnerCounts)
