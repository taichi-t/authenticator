import * as express from 'express';
import passport from 'passport';
import AuthController from '@/server/controllers/auth';

const authRouter: express.Router = express.Router();
const authController = new AuthController();

authRouter.get('/logout', authController.logout);

// google Auth

authRouter.get('/', authController.authenticate);

authRouter.get(
  '/login/google',
  passport.authenticate('google-login', {
    scope: ['profile', 'email'],
    session: true,
  })
);

authRouter.get('/login/google/callback', authController.googleLogin);

authRouter.get(
  '/signup/google',
  passport.authenticate('google-signup', {
    scope: ['profile', 'email'],
    session: true,
  })
);

authRouter.get('/signup/google/callback', authController.googleSignup);

export default authRouter;
