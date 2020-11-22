const baseServerUrl =
  process.env.NODE_ENV === 'production'
    ? 'example.com'
    : 'http://localhost:3000';

export default baseServerUrl;
