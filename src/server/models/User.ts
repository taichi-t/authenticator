import mongoose, { Model } from 'mongoose';
import { IUserDoc } from '@/types/user';

const { String, ObjectId } = mongoose.Schema.Types;

/**
 * User schema
 */

const UserSchema = new mongoose.Schema(
  {
    _id: { type: ObjectId },
    googleId: { type: String, default: '' },
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

UserSchema.methods.AuthWithGoogleId = function (googleId, cb) {
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
