import passport from 'passport';
import Strategies from '@/config/passport/strategies';

const configPassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  const strategies = new Strategies();

  passport.use('google-login', strategies.googleLogin);
  passport.use('google-signup', strategies.googleSignup);

  passport.serializeUser(strategies.serialize);
  passport.deserializeUser(strategies.deserialize);
};

export default configPassport;
