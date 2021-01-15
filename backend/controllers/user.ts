import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { ErrorMessages } from "../interfaces/error";
import { CreateUserRequest, UpdateUserRequest, UserRoleEnums } from "../interfaces/user";
import logger from "../logger";
import UserModel from "../models/user.model";
import auth0Client, { getAuth0Token } from "../services/auth0";
import { validateForm } from "../services/form";
import { BaseController } from "./base";


export default class AuthenticationController extends BaseController {

  // START - Private methods
  private async deleteUserFromAuth0Flow(auth0UserId: string, token: string) {
    logger.info('[CREATE_USER] Deleting user from Auth0 with id', auth0UserId)
    try {
      await auth0Client.delete(
        `/api/v2/users/${auth0UserId}`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      logger.info('[CREATE_USER] User successfully deleted')
    } catch (ex) {
      logger.error('[CREATE_USER] Failed to delete user from Auth0', ex)
    }
  }

  private async addRoleInAuth0Flow(auth0UserId: string, token: string, role: UserRoleEnums) {
    let roles: string[] = []
    if (!process.env.AUTH0_ADMIN_ROLE_ID || !process.env.AUTH0_EMPLOYEE_ROLE_ID) {
      logger.error('[CREATE_USER] Role envs are missing')
      throw 'Role envs are missing'
    }
    if (UserRoleEnums.ADMIN === role) {
      roles = [process.env.AUTH0_ADMIN_ROLE_ID, process.env.AUTH0_EMPLOYEE_ROLE_ID]
    } else {
      roles = [process.env.AUTH0_EMPLOYEE_ROLE_ID]
    }
    logger.info('[CREATE_USER] Adding role to Auth0 ...')
    return (await auth0Client.post(
      `/api/v2/users/${auth0UserId}/roles`,
      { roles },
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
          'cache-control': 'no-cache'
        }
      }
    ))
  }

  private async createUser(data: CreateUserRequest, auth0UserId: string) {
    logger.info('[CREATE_USER] Creating user ...')
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      identification,
      identificationType,
      role,
      reportingPerson,
      remainingLeaveDays,
      employeeEpfPercentage,
      companyEpfPercentage,
      socsoPercentage,
      basicPay,
      position,
      noticePeriod,
      additionalInfo
    } = data
    return (await new UserModel({
      firstName,
      lastName,
      email,
      auth0UserId,
      phone,
      dateOfBirth,
      identification,
      identificationType,
      role,
      reportingPerson,
      employeeEpfPercentage,
      companyEpfPercentage,
      socsoPercentage,
      remainingLeaveDays,
      basicPay,
      position,
      noticePeriod,
      additionalInfo
    }).save())
  }
  // END - Private methods

  async create(req: Request, res: Response, next: NextFunction) {
    logger.info('[CREATE_USER] Receive request to create user', req.body)
    const formData: CreateUserRequest = req.body

    // 1) Clean form
    try {
      validateForm(formData, ['additionalInfo'])
    } catch (error) {
      logger.error('[CREATE_USER] Form is incomplete, throwing error ...')
      return this.clientError(res, ErrorMessages.FORM_INCOMPLETE)
    }
    let token = ''

    // 2) Get Auth0 access token
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

    // 3) Use access token to create user in auth0
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
      auth0UserId = resp.data.user_id
      logger.info('[CREATE_USER] Successfully created user in Auth0')
    } catch (error) {
      logger.error('[CREATE_USER] Failed to create user in Auth0', error)
      return this.unauthorized(res)
    }

    // 4) Add user to db and add user role to Auth0
    // I have not found a way to add role to user in Auth0 on creation
    try {
      await Promise.all([
        this.createUser(formData, auth0UserId),
        this.addRoleInAuth0Flow(auth0UserId, token, formData.role ? formData.role : UserRoleEnums.EMPLOYEE)
      ])
    } catch (err) {
      logger.error(`[CREATE_USER] Failed to create user or add role to Auth0, auth0 id=${auth0UserId}`, err)
      this.deleteUserFromAuth0Flow(auth0UserId, token)
      return this.internalServerError(res)
    }
    return this.ok(res)
  }

  async update(req: Request, res: Response, next: NextFunction) {
    logger.info('[UPDATE_USER] Receive request to update user', req.body)
    const formData: UpdateUserRequest = req.body

    // 1) Clean form
    try {
      validateForm(formData, ['additionalInfo'])
    } catch (error) {
      logger.error('[UPDATE_USER] Form is incomplete, throwing error ...')
      return this.clientError(res, ErrorMessages.FORM_INCOMPLETE)
    }
    const {
      userId,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      identification,
      identificationType,
      role,
      reportingPerson,
      remainingLeaveDays,
      employeeEpfPercentage,
      companyEpfPercentage,
      socsoPercentage,
      basicPay,
      position,
      noticePeriod,
      additionalInfo
    } = formData

    let currentRole: UserRoleEnums | undefined = undefined
    let auth0UserId = ''

    // 2) Check if role needs to be updated
    try {
      const result = await UserModel.findById(userId, 'role auth0UserId')
      if (result) {
        currentRole = result.role
        auth0UserId = result.auth0UserId
      }
    } catch (roleError) {
      logger.error(`[UPDATE_USER] Failed to get current user role, userId=${userId}`, roleError)
      return this.internalServerError(res)
    }
    if (!currentRole || !auth0UserId) {
      logger.error('[UPDATE_USER] Current role or Auth id is missing for user')
      return this.internalServerError(res)
    }
    // Need to update roles
    if (currentRole !== role) {
      // Get Auth0 access token
      let token = ''
      try {
        token = await getAuth0Token()
      } catch (e) {
        logger.error('[CREATE_USER] Failed to get auth token')
        return this.internalServerError(res)
      }
      // this means user has been downgraded
      if (UserRoleEnums.ADMIN === currentRole && UserRoleEnums.ADMIN !== role) {
        try {
          await auth0Client({
            url: `/api/v2/users/${auth0UserId}/roles`,
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${token}`
            },
            data: {
              roles: [process.env.AUTH0_ADMIN_ROLE_ID]
            }
          })
        } catch (deleteRoleError) {
          logger.error('[UPDATE_USER] Failed to remove user role in Auth0, auth0 id=${auth0UserId}', deleteRoleError)
          return this.internalServerError(res)
        }
      }
      // this means user has been promoted
      if (UserRoleEnums.EMPLOYEE === currentRole && UserRoleEnums.ADMIN === role) {
        try {
          await auth0Client.post(`/api/v2/users/${auth0UserId}/roles`, {
            headers: {
              authorization: `Bearer ${token}`
            },
            data: {
              roles: [process.env.AUTH0_ADMIN_ROLE_ID]
            }
          })
        } catch (deleteRoleError) {
          logger.error(`[UPDATE_USER] Failed to remove user role in Auth0, auth0 id=${auth0UserId}`, deleteRoleError)
          return this.internalServerError(res)
        }
      }
    }

    // 3) Update user details in db
    try {
      await UserModel.updateOne({ _id: userId }, {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        identification,
        identificationType,
        role,
        reportingPerson,
        remainingLeaveDays,
        employeeEpfPercentage,
        companyEpfPercentage,
        socsoPercentage,
        basicPay,
        position,
        noticePeriod,
        additionalInfo
      })
    } catch (updateError) {
      logger.error(`[UPDATE_USER] Failed to update user details with userId=${userId}`, updateError)
      this.internalServerError(res)
    }
    return this.ok(res)
  }
}
