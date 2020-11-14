import { Response, NextFunction } from 'express';
import { CustomError } from '@/types/index';

export const logErrors = (err: CustomError, next: NextFunction) => {
  console.error(err.stack);
  next(err);
};

export const errorHandler = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500);
  res.send({ error: err });
};
