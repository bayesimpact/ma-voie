import * as functions from 'firebase-functions'
import {Express} from 'express'

const express = require('express')

const app: Express = express()

app.get('/', (request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true})
  response.send('Hello from Firebase!')
})
export const user = functions.https.onRequest(app)
