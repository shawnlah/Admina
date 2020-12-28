import logger from "../logger";
import { BaseController } from "./base";

export default class AuthenticationController extends BaseController {
  getLogin(req, res, next) {
    console.log("OIJOIJIJOIJOIJ")
    res.status(200).json({ message: "LOGIN request ddfdfdfdfdf" });
  }

  postLogin(req, res, next) {
    console.log("from possssssss")
    res.status(200).json({ message: "POST LOGIN ddfdfdfdfdf" });
  }

  getLogout(req, res, next) {
    logger.info('Logout triggered')
    res.status(200).json({ message: 'Logout' })
  }
}
