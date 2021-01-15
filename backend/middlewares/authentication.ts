import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import jwtAuthz from 'express-jwt-authz'
import * as dotenv from "dotenv";

dotenv.config();

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'http://localhost:5000/auth/',
  issuer: `${process.env.AUTH0_ISSUER}`,
  algorithms: ["RS256"]
})

export const checkPermissions = (permission) => {
  return (req, res, next) => {
    const { permissions } = req.user
    if (permissions.includes(permission)) return next()
    res.status(403).send('Unauthorized')
  }
};
