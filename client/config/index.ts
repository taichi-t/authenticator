export const BASE_CLIENT_URL =
  process.env.NODE_ENV === 'production'
    ? 'example.com'
    : 'http://localhost:3000';

export const BASE_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'example.com'
    : 'http://localhost:3000';

export default { BASE_CLIENT_URL, BASE_SERVER_URL };
