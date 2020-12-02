import * as express from 'express';
import passport from 'passport';
import boom from '@hapi/boom';
import { BASECLIENTURL } from '@/client/config';

const authRouter: express.Router = express.Router();

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
  passport.authenticate('google-login', {
    scope: ['profile', 'email'],
    session: true,
  })
);

authRouter.get('/login/google/callback', (req, res, next) => {
  passport.authenticate('google-login', (err, user, info) => {
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
  passport.authenticate('google-signup', {
    scope: ['profile', 'email'],
    session: true,
  })
);

authRouter.get('/signup/google/callback', (req, res, next) => {
  passport.authenticate('google-signup', (err, user, info) => {
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
