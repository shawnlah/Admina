import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import { BaseController } from "./base";
import bcrypt from 'bcryptjs'
import { IdentificationTypeEnum, UserRoleEnums } from "../interfaces/user";
import UserModel from '../models/user.model'

export default class UserController extends BaseController {
  async create(req: Request, res: Response, next: NextFunction) {
    logger.info('[USER] User creation request received')
    console.log(req)
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash('', salt)
    const user = new UserModel()
    try {
      await user.save()
      console.log('USER SAVED')
    } catch (error) {
      console.log('GFUCK', error)
    }
    res.status(200).json({ message: "POST LOGIN ddfdfdfdfdf" });
  }
}
