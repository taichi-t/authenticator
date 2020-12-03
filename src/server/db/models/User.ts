import mongoose, { Model } from 'mongoose';
import { IUserDoc, CustomGoogleProfile } from '@/types/user';

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    provider: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '', unique: true },
    profileUrl: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

// Methods

UserSchema.methods.AuthWithEmail = function (email: string, cb) {
  UserModel.findOne({ email }, (err, user) => {
    return cb(err, user);
  });
};

UserSchema.methods.RegisterWithGoogleProfile = function (
  profile: CustomGoogleProfile,
  cb
) {
  const { name, emails, photos, provider } = profile;
  const newUser = new UserModel({
    provider,
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
