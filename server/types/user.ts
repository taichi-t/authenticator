import { Document } from 'mongoose';
import { Profile } from 'passport-google-oauth20';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
  prodiver: string;
}

export interface IUserFrontnd extends IUser {
  createdAt: string;
  updatedAt: string;
}

export interface IUserDoc extends IUser, Document {
  registerWithGoogleProfile: (
    profile: CustomGoogleProfile,
    cb: (err: Error | null, user: IUser | null) => void
  ) => void;

  authWithEmail: (
    email: string,
    cb: (err: Error | null, user: IUser | null) => void
  ) => void;

  authWithId: (
    id: string,
    cb: (err: Error | null, user: IUser | null) => void
  ) => void;

  getUser: (
    id: string,
    cb: (err: Error | null, user: IUser | null) => void
  ) => void;
}

export interface CustomGoogleProfile extends Profile {
  provider: string;
  id: string;
  name: {
    familyName: string;
    givenName: string;
  };
  photos: [
    {
      value: string;
    }
  ];
  emails: [
    {
      value: string;
      verified: boolean;
    }
  ];
}
