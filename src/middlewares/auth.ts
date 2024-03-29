// update the passport version that supports es6
import { RequestHandler } from "express";
import passport from "passport";


const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  
  if (err || info || !user) {
    // TODO add status to this rejection 
    return reject("Please authenticate");
  }
  req.user = user;

  resolve();
};

const auth: RequestHandler =  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
