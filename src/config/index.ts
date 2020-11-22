export const BASECLIENTURL =
  process.env.NODE_ENV === 'production'
    ? 'example.com'
    : 'http://localhost:3000';

export const BASESERVERURL =
  process.env.NODE_ENV === 'production'
    ? 'example.com'
    : 'http://localhost:3000';

export const GOOGLE = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: `${BASESERVERURL}/api/auth/google/callback`,
};

export const SESSION = { secret: process.env.SESSION_SECRET };

export default { GOOGLE, BASECLIENTURL, BASESERVERURL, SESSION };
