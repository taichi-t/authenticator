import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import { GOOGLE } from '@/config/index';

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE.clientID,
      clientSecret: GOOGLE.clientSecret,
      callbackURL: GOOGLE.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('authentication done', profile);
      return done(null, profile);
    }
  )
);

export default passport;
