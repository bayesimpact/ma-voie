import * as functions from 'firebase-functions'

import {incrementPartnerCount} from './firestore'

// TODO(cyrille): Add tests.
// TODO(cyrille): Also update based on the actual count regularly.
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
