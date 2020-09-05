/**
 * @apiVersion 0.1.0
 */
import * as bodyParser from 'body-parser'
import * as functions from 'firebase-functions'
import * as express from 'express'
import {Request, Response} from 'express'
import * as BasicAuth from 'express-basic-auth'

import {registerUser, validateUser} from './firestore'

const app = express()


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
app.use(BasicAuth({
  challenge: true,
  realm: 'MaVoie',
  users: functions.config().basicauth,
}))

/**
 * @apiDefine userIdParam
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
 * @apiError MissingStepId The stepId parameter is missing from the JSON body.
 * @apiErrorExample MissingStepId-Response:
 *          HTTP/1.1 400 Bad Request
 *
 */
app.use(bodyParser.json({strict: false}), (request: Request, response, next) => {
  if (!request.body.stepId) {
    response.status(400).send('Parameter "stepId" is missing.')
    return
  }
  next()
})


/**
 *
 * @api {post} /user/:userId/register Register that a given user has started your program.
 * @apiName RegisterStep
 * @apiGroup User
 *
 * @apiUse userIdParam
 * @apiUse basicAuth
 * @apiUse stepParam
 */
app.post('/:userId/register', (request: Request, response: Response) => {
  // TODO(cyrille): Update type definitions in @types/express to avoid recasting.
  const {auth: {user: partner}} = request as BasicAuth.IBasicAuthedRequest
  const {body: {stepId}, params: {userId}} = request
  registerUser(partner, userId, stepId)
  // TODO(cyrille): Replace status to 204 once we've actually done something with the request.
  response.status(202).send(`Thank you ${partner} for registering ${userId} for step ${stepId}.`)
})

/**
 *
 * @api {post} /user/:userId/confirm Validate your program for a given user
 * @apiName ConfirmStep
 * @apiGroup User
 *
 * @apiUse userIdParam
 * @apiUse basicAuth
 * @apiUse stepParam
 */
app.post('/:userId/confirm', (request: Request, response: Response) => {
  // TODO(cyrille): Update type definitions in @types/express to avoid recasting.
  const {auth: {user: partner}} = request as BasicAuth.IBasicAuthedRequest
  const {body: {stepId}, params: {userId}} = request
  validateUser(partner, userId, stepId)
  // TODO(cyrille): Replace status to 204 once we've actually done something with the request.
  response.status(202).send(`Thank you ${partner} for validating ${userId} on step ${stepId}.`)
})

export const user = functions.https.onRequest(app)
export {updateCount} from './count'
