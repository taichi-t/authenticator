export const BASESERVERURL =
  process.env.NODE_ENV === 'production'
    ? 'example.com'
    : 'http://localhost:3000';

export const GOOGLE = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
};

export const SESSION = { secret: process.env.SESSION_SECRET };

export default { GOOGLE, BASESERVERURL, SESSION };
