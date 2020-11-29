import { Document } from 'mongoose';
import { Profile } from 'passport-google-oauth20';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
  googleId: string;
}

export interface CustomGoogleProfile extends Profile {
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

export interface IUserDoc extends IUser, Document {
  AuthWithGoogleId: (
    googleId: string,
    cb: (err: Error | null, user: IUser | null) => void
  ) => void;

  RegisterWithGoogleProfile: (
    profile: CustomGoogleProfile,
    cb: (err: Error | null, user: IUser | null) => void
  ) => void;
}
