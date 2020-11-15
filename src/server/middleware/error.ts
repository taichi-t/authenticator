import { Response, Request } from 'express';

import boom from '@hapi/boom';

export const logErrors = (err: boom.Boom<Error>) => {
  console.error(err.output);
};

export const errorHandler = (
  err: boom.Boom<Error>,
  req: Request,
  res: Response
) => {
  logErrors(err);
  res.status(err.output.statusCode || 500);
  res.send({ error: err });
};
