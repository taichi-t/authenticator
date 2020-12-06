import 'express-session';
import 'express';
import { IUserDoc } from './user';

declare module 'express-session' {
  interface SessionData {
    info?: {
      message: string;
    };
  }
}
declare global {
  namespace Express {
    interface User extends IUserDoc {}
  }
}

export {};
