import * as functions from 'firebase-functions'
import {Express, Request, Response} from 'express'
import * as BasicAuth from 'express-basic-auth'

const express = require('express')

const app: Express = express()

app.use(BasicAuth({
  challenge: true,
  realm: 'MaVoie',
  users: functions.config().basicauth,
}))

app.get('/', (request: Request, response: Response) => {
  functions.logger.info('Hello logs!', {structuredData: true})
  const {auth: {user}} = request as BasicAuth.IBasicAuthedRequest
  response.send(`Hello ${user} from Firebase!`)
})
export const user = functions.https.onRequest(app)
