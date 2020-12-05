import * as express from 'express';
import passport from 'passport';
import boom from '@hapi/boom';
import { BASECLIENTURL } from '@/client/config';
import { IUserDoc } from '@/types/user';
import UserModel from '@/server/db/models/User';

class AuthController {
  logout: express.RequestHandler = (req, res) => {
    req.logout();
    req.session.destroy((err: Error) => {
      if (err) {
        const customError = boom.badGateway('Error deleting session', err);
        res.send(customError);
      }
      res.clearCookie('connect.sid');
      res.redirect(`${BASECLIENTURL}`);
    });
  };

  Authenticate: express.RequestHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
      const user = new UserModel();
      const id = req.user._id;
      return user.GetUser(id, (err, _user) => {
        if (err) {
          return res
            .status(401)
            .send({ message: "Couldn't find your profile, please try again" });
        }
        const result = {
          user: _user,
          isAuthenticated: req.isAuthenticated(),
        };
        return res.json(result);
      });
    }
    if (req.isUnauthenticated()) {
      const { info } = req.session;
      req.session.info = null;
      return res
        .status(401)
        .send(info || { message: 'You are not currently logged in.' });
    }
    const customError = boom.badImplementation(
      'Error implementing authentication.'
    );
    return next(customError);
  };

  googleLogin: express.RequestHandler = (req, res, next) => {
    passport.authenticate(
      'google-login',
      (err: Error, user: IUserDoc, info) => {
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
      }
    )(req, res, next);
  };

  googleSignup: express.RequestHandler = (req, res, next) => {
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
  };
}

export default AuthController;
