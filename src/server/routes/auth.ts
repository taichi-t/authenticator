import * as express from 'express';
// import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import { BASECLIENTURL } from '@/config/index';
import googlePassport from '@/server/controllers/auth/google';
import boom from '@hapi/boom';

const authRouter: express.Router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

authRouter.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      const customError = boom.badGateway('Error deleting session', err);
      next(customError);
    }
    res.clearCookie('connect.sid');
    res.send('logged out');
  });
});

authRouter.get(
  '/google',
  googlePassport.authenticate('google', { scope: ['profile'], session: true })
);

authRouter.get(
  '/google/callback',
  googlePassport.authenticate('google', {
    failureRedirect: `/google`,
    failureFlash: true,
    session: true,
  }),
  (req, res) => {
    res.redirect(`${BASECLIENTURL}`);
  }
);

export default authRouter;
