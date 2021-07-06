import 'express-session';
import 'express';
import { IUser } from './user';

declare module 'express-session' {
  export interface SessionData {
    info?: {
      message: string;
    };
  }
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
