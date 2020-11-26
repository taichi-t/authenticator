import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import { GOOGLE } from '@/config/index';
import User from '@/server/models/User';
import boom from '@hapi/boom';

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE.clientID,
      clientSecret: GOOGLE.clientSecret,
      callbackURL: GOOGLE.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = new User();
      const { id } = profile;
      user.isAuthenticated(id, (_err, _user) => {
        if (_err) {
          const customError = boom.badImplementation('Server Error.', _err);
          return done(null, false, customError);
        }
        if (!_user) {
          const customError = boom.badImplementation(
            'Your google acount is not registered, please sign up.',
            _err
          );
          return done(null, false, customError);
        }
        return done(null, _user);
      });
    }
  )
);

export default passport;
