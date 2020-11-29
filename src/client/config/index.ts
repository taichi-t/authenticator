export const BASECLIENTURL =
  process.env.NODE_ENV === 'production'
    ? 'example.com'
    : 'http://localhost:3000';

export const BASESERVERURL =
  process.env.NODE_ENV === 'production'
    ? 'example.com'
    : 'http://localhost:3000';

export default { BASECLIENTURL, BASESERVERURL };
