import mongoose, { Document, Model } from 'mongoose';
import { IUser } from '@/types/user';

const { String } = mongoose.Schema.Types;

interface IUserDoc extends IUser, Document {
  isAuthenticated: (googleId: string, cb) => Error | IUser;
}

/**
 * User schema
 */

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    profileUrl: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.methods.isAuthenticated = function (googleId, cb) {
  UserModel.findOne({ googleId }, (err, user) => {
    return cb(err, user);
  });
};
/**
 * Statics
 */

UserSchema.static({});

/**
 * Register
 */

const UserModel: Model<IUserDoc> = mongoose.model<IUserDoc>('User', UserSchema);

export default UserModel;
