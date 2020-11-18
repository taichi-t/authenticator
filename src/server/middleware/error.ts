import { RequestHandler, ErrorRequestHandler } from 'express';

import boom from '@hapi/boom';

export const logErrors: ErrorRequestHandler = (
  err: boom.Boom<Error> | Error,
  req,
  res,
  next
) => {
  console.error(err);
  next(err);
};

export const errorHandler: ErrorRequestHandler = (
  err: boom.Boom<Error> | Error,
  req,
  res
) => {
  if (boom.isBoom(err)) {
    res.send({ error: err });
  } else {
    const customError = boom.internal('Something wrong, please try again.');
    res.send({ error: customError });
  }
};

export const notFound: RequestHandler = (req, res, next) => {
  const customError = boom.notFound('Not found');
  next(customError);
};
