import mongoose, { Document, Schema } from 'mongoose';

export interface ILike extends Document {
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const likeSchema = new Schema<ILike>(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true },
);

// unique index to prevent duplicate likes
likeSchema.index({ post: 1, user: 1 }, { unique: true });

const Like = mongoose.model<ILike>('Like', likeSchema);
export default Like;
