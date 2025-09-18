import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'admin' | 'author' | 'reader';
export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  googleId?: string;
  githubId?: string;
  otp?: string;
  otpExpires?: Date;
  refreshToken?: string | null;
  isVerified?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String }, // nullable for OAuth users
    name: { type: String },
    avatar: { type: String },
    role: {
      type: String,
      enum: ['admin', 'author', 'reader'],
      default: 'reader',
    },
    googleId: { type: String },
    githubId: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    refreshToken: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
