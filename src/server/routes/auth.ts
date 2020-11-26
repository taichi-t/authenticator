import * as express from 'express';
// import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import googlePassport from '@/server/controllers/auth/google';
import boom from '@hapi/boom';
import { BASECLIENTURL } from '@/config';

const authRouter: express.Router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

authRouter.get('/', (req, res) => {
  if (!req.user) {
    res.status(401).send({ message: 'You are not currently logged in' });
  }
  return res.json(req.user);
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      const customError = boom.badGateway('Error deleting session', err);
      res.send(customError);
    }
    res.clearCookie('connect.sid');
    res.send('logged out');
  });
});

authRouter.get(
  '/login/google',
  googlePassport.authenticate('google', { scope: ['profile'], session: true })
);

authRouter.get(
  '/login/google/callback',
  googlePassport.authenticate('google', {
    failureRedirect: BASECLIENTURL,
    successRedirect: BASECLIENTURL,
    failureFlash: true,
    session: true,
  }),
  (req, res) => {
    res.json(req.user);
  }
);

export default authRouter;
