import { Document } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
  googleId: string;
}

export interface IUserDoc extends IUser, Document {
  isAuthenticated: (
    googleId: string,
    cb: (err: Error | null, user: IUser | null) => void
  ) => void;
}
