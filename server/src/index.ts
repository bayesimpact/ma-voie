/**
 * @apiVersion 0.1.0
 */
import * as bodyParser from 'body-parser'
import * as functions from 'firebase-functions'
import * as express from 'express'
import {NextFunction, Request, Response} from 'express'
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
  // TODO(cyrille): Use a different realm for different deployments.
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
// TODO(cyrille): Consider using a middleware composer.
const checkForStepId = [
  bodyParser.json({type: '*/*'}),
  (request: Request, response: Response, next: NextFunction): void => {
    if (!request.body.stepId) {
      response.status(400).json({error: {stepId: 'Missing parameter'}})
      return
    }
    next()
  },
]


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
app.post('/user/:userId/register', ...checkForStepId, (request: Request, response: Response) => {
  const {body: {stepId}, params: {userId}} = request
  registerUser(userId, stepId).then((result) => {
    const status = result === 'UPDATED' ? 204 : result === 'NOT_FOUND' ? 404 : 500
    response.status(status).send()
  })
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
app.post('/user/:userId/confirm', ...checkForStepId, (request: Request, response: Response) => {
  const {body: {stepId}, params: {userId}} = request
  validateUser(userId, stepId).then((result) => {
    const status = result === 'UPDATED' ? 204 : result === 'NOT_FOUND' ? 404 : 500
    response.status(status).send()
  })
})

app.all('*', (request: Request, response: Response) => response.status(404).send())

export const user = functions.https.onRequest(app)
export {updateCount, resetCount} from './count'
