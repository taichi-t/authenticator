import mongoose, { Model } from 'mongoose';
import { IUserDoc, CustomGoogleProfile } from '@/types/user';

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
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

// Methods

UserSchema.methods.AuthWithGoogleId = function (googleId: string, cb) {
  UserModel.findOne({ googleId }, (err, user) => {
    return cb(err, user);
  });
};

UserSchema.methods.RegisterWithGoogleProfile = function (
  profile: CustomGoogleProfile,
  cb
) {
  const { id, name, emails, photos } = profile;
  const newUser = new UserModel({
    googleId: id,
    firstName: name.familyName,
    lastName: name.givenName,
    email: emails[0].value,
    profileUrl: photos[0].value,
  });
  newUser.save((err, user) => {
    return cb(err, user);
  });
};
// Statics

UserSchema.static({});

const UserModel: Model<IUserDoc> = mongoose.model<IUserDoc>('User', UserSchema);

export default UserModel;
