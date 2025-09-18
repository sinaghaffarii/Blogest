import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  contentHtml: string; // sanitized HTML
  plainText: string;
  excerpt?: string;
  categories: string[]; // simple string categories or ref to Category model
  coverImage?: string; // url
  likesCount: number;
  commentsCount: number;
  published: boolean;
  publishedAt?: Date;
}

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    contentHtml: { type: String, required: true },
    plainText: { type: String, required: true },
    excerpt: { type: String },
    categories: [{ type: String }],
    coverImage: { type: String },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
