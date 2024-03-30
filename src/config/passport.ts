import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { jwt } from './config';
import { tokenTypes } from './tokens';
import User  from '../models/user';

interface JwtPayload {
  type: string;
  sub?: string;
  id?: string;
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt.secret,
};

const jwtVerify = async (payload: JwtPayload, done: VerifiedCallback) => {
  try {
    if (payload.type !== tokenTypes.ACCESS && payload.type !== tokenTypes.REFRESH) {
      throw new Error('Invalid token type');
    }
    const userId = payload.sub || payload.id;
    const user = await User.findById(userId);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = passport.use( new JwtStrategy(jwtOptions, jwtVerify));

export default jwtStrategy;
