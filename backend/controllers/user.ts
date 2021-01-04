import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import { BaseController } from "./base";
import bcrypt from 'bcryptjs'
import { IdentificationTypeEnum, UserRoleEnums } from "../interfaces/user";
import UserModel from '../models/user.model'
import { sign } from 'jsonwebtoken'

export default class UserController extends BaseController {
  async create(req: Request, res: Response, next: NextFunction) {
    logger.info('[USER] User creation request received', req)

    res.status(200).json({ message: "POST LOGIN ddfdfdfdfdf" });
  }
}
