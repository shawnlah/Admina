import { NextFunction, Request, Response } from "express";
import { ErrorMessages } from "../interfaces/error";
import { CreateUserRequest } from "../interfaces/user";
import logger from "../logger";
import auth0Client, { getAuth0Token } from "../services/auth0";
import { validateForm } from "../services/form";
import { BaseController } from "./base";


export default class AuthenticationController extends BaseController {
  async create(req: Request, res: Response, next: NextFunction) {
    logger.info('[CREATE_USER] Receive request to create user', req.body)
    const formData: CreateUserRequest = req.body

    try {
      validateForm(formData, ['additionalInfo'])
    } catch (error) {
      logger.error('[CREATE_USER] Form is incomplete, throwing error ...')
      return this.clientError(res, ErrorMessages.FORM_INCOMPLETE)
    }

    let token = ''

    // 1) Get auth0 access token
    try {
      token = await getAuth0Token()
    } catch (e) {
      logger.error('[CREATE_USER] Failed to get auth token')
      return this.internalServerError(res)
    }

    if (!process.env.EMPLOYEE_INITIAL_PASSWORD) {
      logger.error('[CREATE_USER] Failed to get initial employee password env')
      return this.internalServerError(res)
    }

    // 2) Use access token to create user in auth0
    let auth0UserId = ''
    try {
      const resp = await auth0Client.post(
        '/api/v2/users',
        {
          email: formData.email,
          connection: process.env.AUTH0_CONNECTION,
          password: process.env.EMPLOYEE_INITIAL_PASSWORD + formData.identification
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      console.log('success')
      console.log(resp.data)
      // const userAuth0Id = resp.data.user_id
      auth0UserId = 'auth0|5ffd4570ebc5d70076ca5dc7'
    } catch (error) {
      console.log(`failure ${error}`)
      console.log(error.message)
      return this.unauthorized(res)
    }
    // TODO
    // 3) Add user to db and add role to user in auth0 simultaneously
    // I have not found a way to add role to user in auth0 on creation
    return this.ok(res)
  }
}
