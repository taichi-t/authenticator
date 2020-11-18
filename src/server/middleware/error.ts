import { Response, Request, NextFunction } from 'express';

import boom from '@hapi/boom';

export const logErrors = (
  err: boom.Boom<Error> | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  next();
};

export const errorHandler = (
  err: boom.Boom<Error> | Error,
  req: Request,
  res: Response
) => {
  res.status(500);
  res.send({ error: err });
};
