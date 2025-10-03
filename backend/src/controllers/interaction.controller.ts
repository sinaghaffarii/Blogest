import { Request, Response, NextFunction } from 'express';
import Like from '../models/like.model';
import Blog from '../models/blog.mode';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../middlewares/errorHandler';

class InteractionController {
  public async likePost(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const { postId } = req.body;
      if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Login required');

      const like = await Like.findOne({ post: postId, user: user.id });
      if (like) {
        // unlike
        await like.deleteOne();
        await Blog.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
        return res.status(StatusCodes.OK).json({ message: 'Unliked' });
      } else {
        await Like.create({ post: postId, user: user.id });
        await Blog.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
        return res.status(StatusCodes.CREATED).json({ message: 'Liked' });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new InteractionController();
