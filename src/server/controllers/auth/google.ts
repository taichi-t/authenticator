import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import { GOOGLE, BASESERVERURL } from '@/server/config/index';
import User from '@/server/models/User';
import boom from '@hapi/boom';
import { CustomGoogleProfile } from '@/types/user';

const credentials = {
  clientID: GOOGLE.clientID,
  clientSecret: GOOGLE.clientSecret,
};

const user = new User();

passport.use(
  'google-login',
  new Strategy(
    {
      ...credentials,
      callbackURL: `${BASESERVERURL}/api/auth/login/google/callback`,
    },
    (accessToken, refreshToken, profile: CustomGoogleProfile, done) => {
      const { id } = profile;
      user.AuthWithGoogleId(id, (_err, _user) => {
        if (_err) {
          const customError = boom.badImplementation('Server Error.', _err);
          return done(customError, false);
        }
        if (!_user) {
          return done(null, false, {
            message: 'Your google account is not registered, please sign up.',
          });
        }
        return done(null, _user);
      });
    }
  )
);

passport.use(
  'google-signup',
  new Strategy(
    {
      ...credentials,
      callbackURL: `${BASESERVERURL}/api/auth/signup/google/callback`,
    },
    (accessToken, refreshToken, profile: CustomGoogleProfile, done) => {
      user.AuthWithGoogleId(profile.id, (_authErr, _user) => {
        if (_authErr) {
          const customError = boom.badImplementation('Server Error.', _authErr);
          return done(customError, false);
        }
        if (_user) {
          return done(null, false, {
            message:
              'Your google account is already registered, please log in.',
          });
        }
        if (!_authErr && !_user) {
          return user.RegisterWithGoogleProfile(
            profile,
            (_registerErr, _newUser) => {
              if (_registerErr) {
                const customError = boom.badImplementation(
                  'Server Error.',
                  _registerErr
                );
                return done(customError, false);
              }

              return done(null, _newUser);
            }
          );
        }
        const customError = boom.badImplementation('Error registering user');
        return done(customError, false);
      });
    }
  )
);

export default passport;
