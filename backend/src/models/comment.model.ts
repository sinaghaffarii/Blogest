import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  post: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  content: string; // sanitized html or plain text depending on your choice
  parent?: mongoose.Types.ObjectId; // for replies
  resolved?: boolean;
}

const commentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
