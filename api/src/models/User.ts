import { Document, Schema, model } from 'mongoose';

export interface UserSchema {
  userId: string;
  username: string;
  isWallet: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date | number;
  name?: string;
  bio?: string;
  email?: string;
  profilePictureUri?: string;
  coverPictureUri?: string;
  website?: string;
  discordId?: string;
  twitterId?: string;
  instagramId?: string;
  githubId?: string;
}

export interface UserDocument extends UserSchema, Document {}

const user = new Schema<UserDocument>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  isWallet: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
  },
  profilePictureUri: {
    type: String,
  },
  coverPictureUri: {
    type: String,
  },
  website: {
    type: String,
  },
  discordId: {
    type: String,
  },
  twitterId: {
    type: String,
  },
  instagramId: {
    type: String,
  },
  githubId: {
    type: String,
  },
});

user.pre<UserDocument>('update', function(next) {
  this['updatedAt'] = Date.now();

  next();
});

export const User = model<UserDocument>('users', user);
