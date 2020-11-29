import * as express from 'express';
// import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import googlePassport from '@/server/controllers/auth/google';
import boom from '@hapi/boom';
import { BASECLIENTURL } from '@/client/config';
import { IUserDoc } from '@/types/user';
import UserModel from '@/server/models/User';
import * as session from 'express-session';

const authRouter: express.Router = express.Router();

interface CustomSession extends session.Session {
  info: Record<string, unknown>;
}

export interface CustomRequest extends express.Request {
  session: CustomSession;
}

passport.serializeUser((user: IUserDoc, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((googleId: string, done) => {
  const user = new UserModel();
  user.AuthWithGoogleId(googleId, (_err, _user) => {
    if (_err) {
      const customError = boom.badImplementation('Server Error.', _err);
      return done(customError, false);
    }
    if (!_user) {
      const customError = boom.badImplementation(
        'Your google acount is not registered, please sign up.',
        _err
      );
      return done(customError, false);
    }
    return done(null, _user);
  });
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      const customError = boom.badGateway('Error deleting session', err);
      res.send(customError);
    }
    res.clearCookie('connect.sid');
    res.redirect(`${BASECLIENTURL}`);
  });
});

// google Auth

authRouter.get(
  '/login/google',
  googlePassport.authenticate('google-login', {
    scope: ['profile'],
    session: true,
  })
);

authRouter.get('/login/google/callback', (req: CustomRequest, res, next) => {
  googlePassport.authenticate('google-login', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info && !user) {
      req.session.info = info;
      return res.redirect(`${BASECLIENTURL}`);
    }
    if (user) {
      return req.logIn(user, (_err) => {
        if (_err) {
          return next(err);
        }
        return res.redirect(`${BASECLIENTURL}`);
      });
    }
    const customError = boom.badImplementation('Error loginning');
    return next(customError);
  })(req, res, next);
});

authRouter.get(
  '/signup/google',
  googlePassport.authenticate('google-signup', {
    scope: ['profile', 'email'],
    session: true,
  })
);

authRouter.get('/signup/google/callback', (req: CustomRequest, res, next) => {
  googlePassport.authenticate('google-signup', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info && !user) {
      req.session.info = info;
      return res.redirect(`${BASECLIENTURL}`);
    }
    if (user) {
      return req.logIn(user, (_err) => {
        if (_err) {
          return next(err);
        }
        return res.redirect(`${BASECLIENTURL}`);
      });
    }
    const customError = boom.badImplementation('Error loginning');
    return next(customError);
  })(req, res, next);
});

export default authRouter;
