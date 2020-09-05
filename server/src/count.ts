import * as functions from 'firebase-functions'

import {updatePartnerCount} from './firestore'

export const updateCount = functions.firestore.document('user/{userId}/partners/{partnerId}').
  onWrite(({after: {data: getDocument}, before: {exists: isUpdate}}) => {
    if (isUpdate) {
      return
    }
    const {partnerId, userPartnerId} = getDocument() || {}
    if (!partnerId || !userPartnerId) {
      return
    }
    updatePartnerCount(partnerId)
  })
