import { Request, Response, NextFunction } from 'express';
import Post from '../models/post.mode';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../middlewares/errorHandler';
import slugify from 'slugify';
import { plainTextFromHtml } from '../utils/html';

class PostController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Login required');

      const { title, contentHtml, categories = [], coverImage, published } = req.body;
      if (!title || !contentHtml) throw new ApiError(StatusCodes.BAD_REQUEST, 'title & content required');

      const slug = slugify(title, { lower: true }) + '-' + Date.now().toString().slice(-4);
      const plainText = plainTextFromHtml(contentHtml);
      const excerpt = plainText.slice(0, 200);

      const post = await Post.create({
        author: user.id,
        title,
        slug,
        contentHtml,
        plainText,
        excerpt,
        categories,
        coverImage,
        published: !!published,
        publishedAt: published ? new Date() : undefined,
      });

      res.status(StatusCodes.CREATED).json({ post });
    } catch (err) {
      next(err);
    }
  }

  public async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const post = await Post.findOne({ slug }).populate('author', 'name avatar email');
      if (!post) throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
      res.status(StatusCodes.OK).json({ post });
    } catch (err) { next(err); }
  }

  // update, delete, list with filters (category, author, q) similar...
}

export default new PostController();
