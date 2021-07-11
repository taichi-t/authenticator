export const BASE_CLIENT_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : `http://localhost:3000`;

export const GOOGLE = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
};

export const SESSION = { secret: process.env.SESSION_SECRET };

export default { GOOGLE, SESSION };
