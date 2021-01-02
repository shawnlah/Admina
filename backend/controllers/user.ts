import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import { BaseController } from "./base";

export default class UserController extends BaseController {
  create(req: Request, res: Response, next: NextFunction) {
    logger.info('[USER] User creation request received')
    console.log(req)
    res.status(200).json({ message: "POST LOGIN ddfdfdfdfdf" });
  }
}
