/**
 * @apiVersion 0.1.0
 */
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

/**
 * @apiDefine basicAuth
 * @apiHeader Authorization Basic authentication for the partner
 * @apiHeaderExample {String} BasicAuth-Example:
 *         Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
 * @apiError Unauthorized Missing or invalid Authorization header
 * @apiErrorExample Unauthorized-Response:
 *         HTTP/1.1 401 Unauthorized
 * @apiError Forbidden You don't have the right to perform this action
 * @apiErrorExample Forbidden-Response:
 *         HTTP/1.1 403 Forbidden
 */

/**
 * @apiDefine userParam
 * @apiParam {sha1} userId Unique identifier for the user and the partner
 * @apiError UserNotFound User wasn't found with the given ID
 * @apiErrorExample UserNotFound-Response:
 *         HTTP/1.1 404 Not Found
 */

/**
 * @apiDefine stepParam
 * @apiHeader Content-Type application/json
 * @apiParam {String="definition","skills","training"} stepId Identifier for the step your
     program validates for the user
 * @apiParamExample {json} Request-Example:
                 { "stepId": "definition" }
 */


/**
 *
 * @api {post} /user/:userId/register Register a given user as starting your program
 * @apiName RegisterStep
 * @apiGroup User
 *
 * @apiUse userParam
 * @apiUse basicAuth
 * @apiUse stepParam
 */

/**
 *
 * @api {post} /user/:userId/confirm Validate your program for a given user
 * @apiName ConfirmStep
 * @apiGroup User
 *
 * @apiUse userParam
 * @apiUse basicAuth
 * @apiUse stepParam
 */
app.get('/', (request: Request, response: Response) => {
  functions.logger.info('Hello logs!', {structuredData: true})
  const {auth: {user}} = request as BasicAuth.IBasicAuthedRequest
  response.send(`Hello ${user} from Firebase!`)
})
export const user = functions.region('europe-west1').https.onRequest(app)
