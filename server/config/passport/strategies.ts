import { Strategy } from 'passport-google-oauth20';
import { GOOGLE, BASE_SERVER_URL } from '@/config';
import UserModel from '@/db/models/User';
import boom from '@hapi/boom';
import { CustomGoogleProfile, IUserDoc } from '@/types/user';

const credentials = {
  clientID: GOOGLE.clientID,
  clientSecret: GOOGLE.clientSecret,
};

class Strategies {
  user: IUserDoc;

  constructor() {
    this.user = new UserModel();
  }

  googleLogin = new Strategy(
    {
      ...credentials,
      callbackURL: `${BASE_SERVER_URL}/api/auth/login/google/callback`,
    },
    (accessToken, refreshToken, profile: CustomGoogleProfile, done) => {
      const { emails } = profile;
      this.user.authWithEmail(emails[0].value, (_err, _user) => {
        if (_err) {
          const customError = boom.badImplementation('Server Error.', _err);
          return done(customError, undefined);
        }
        if (!_user) {
          return done(null, undefined, {
            message: 'Your google account is not registered, please sign up.',
          });
        }
        return done(null, _user);
      });
    }
  );

  googleSignup = new Strategy(
    {
      ...credentials,
      callbackURL: `${BASE_SERVER_URL}/api/auth/signup/google/callback`,
    },
    (accessToken, refreshToken, profile: CustomGoogleProfile, done) => {
      const { emails } = profile;
      this.user.authWithEmail(emails[0].value, (_authErr, _user) => {
        if (_authErr) {
          const customError = boom.badImplementation('Server Error.', _authErr);
          return done(customError, undefined);
        }
        if (_user) {
          return done(null, undefined, {
            message:
              'Your google account is already registered, please log in.',
          });
        }
        if (!_authErr && !_user) {
          return this.user.registerWithGoogleProfile(
            profile,
            (_registerErr, _newUser) => {
              if (_registerErr) {
                const customError = boom.badImplementation(
                  'Server Error.',
                  _registerErr
                );
                return done(customError, undefined);
              }

              return done(null, _newUser);
            }
          );
        }
        const customError = boom.badImplementation('Error registering user');
        return done(customError, undefined);
      });
    }
  );

  serialize = (user: IUserDoc, done) => {
    done(null, user._id);
  };

  deserialize = (id: string, done) => {
    this.user.authWithId(id, (_err, _user) => {
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
  };
}

export default Strategies;
