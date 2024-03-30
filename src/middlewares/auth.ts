// update the passport version that supports es6
import { Response, NextFunction,RequestHandler } from 'express';
import passport from "passport";
import {AuthenticatedRequest} from '../types/user.interface';
// Define a custom interface for the authenticated request

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  
  if (err || info || !user) {
    // TODO add status to this rejection 
    return reject("Please authenticate");
  }
  req.user = user;

  resolve();
};

export const auth:RequestHandler =  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
      .then(() =>next())
      .catch((err) => next(err));
  };
// Middleware to extract user ID from authenticated request
export const extractUserId = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.userId = req.user._id; 
  return next();
};
