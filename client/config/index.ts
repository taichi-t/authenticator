const getConfig = () => {
  if (process.env.DEPLOY_ENV === 'production') {
    return {
      API_ENDPOINT: process.env.API_ENDPOINT,
    };
  }
  if (process.env.DEPLOY_ENV === 'preview') {
    return {
      API_ENDPOINT: process.env.API_ENDPOINT,
    };
  }
  if (
    process.env.DEPLOY_ENV !== 'preview' &&
    process.env.NODE_ENV === 'development'
  ) {
    return {
      API_ENDPOINT: 'http://localhost:3000',
    };
  }
  throw new Error('unexpected env');
};

export default getConfig;
