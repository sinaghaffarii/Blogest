import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  googleId?: string;
  githubId?: string;
  otp?: string;
  otpExpires?: Date;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
