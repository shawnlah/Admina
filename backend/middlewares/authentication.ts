import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import logger from '../logger'


interface JWTObject {
  sub: string;
  iat: number;
  exp: number;
}

export default function (req: Request, res: Response, next: NextFunction) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    logger.error('Token does not exist on request')
    return res.status(401).send('Unauthenticated request')
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    logger.error('Access token secret is invalid')
    return res.status(500).send('Internal server error, please contact an administrator.')
  }

  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedObject) => {
    if (err) {
      logger.error('JWT error', err)
      return res.status(403).send(err)
    }
    // if missing user id in token
    if (!decodedObject || !(decodedObject as JWTObject).sub) {
      logger.error('Invalid JWT')
      return res.status(403).send(err)
    }
    res.locals.user_id = (decodedObject as JWTObject).sub
    next()
  })
}
