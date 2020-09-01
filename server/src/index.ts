import * as functions from 'firebase-functions'
import {Express, Response} from 'express'
import * as BasicAuth from 'express-basic-auth'

const express = require('express')

const app: Express = express()

app.use(BasicAuth({
  challenge: true,
  realm: 'MaVoie',
  users: functions.config().basicauth,
}))

app.get('/', (request: BasicAuth.IBasicAuthedRequest, response: Response) => {
  functions.logger.info('Hello logs!', {structuredData: true})
  response.send(`Hello ${request.auth.user} from Firebase!`)
})
export const user = functions.https.onRequest(app)
