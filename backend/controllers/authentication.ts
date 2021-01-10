import logger from "../logger";
import { BaseController } from "./base";

export default class AuthenticationController extends BaseController {
  login(req, res, next) {
    console.log("from possssssss")
    res.status(200).json({ message: "POST LOGIN ddfdfdfdfdf" });
  }

  logout(req, res, next) {
    logger.info('Logout triggered')
    res.status(200).json({ message: 'Logout' })
  }

  testing(req, res, next) {
    logger.info('testing triggered')
    res.status(200).json({ message: 'testing success' })
  }
}
