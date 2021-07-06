import { RequestHandler, ErrorRequestHandler } from 'express';
import boom, { Boom } from '@hapi/boom';

export interface CustomError {
  err: Boom<Error> | Error | Boom<unknown>;
}

export const logErrors: ErrorRequestHandler = (
  err: CustomError,
  req,
  res,
  next
) => {
  console.error(err);
  next(err);
};

export const errorHandler: ErrorRequestHandler = (err: Error, req, res) => {
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
