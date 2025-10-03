import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Blog, { IBlog } from '../models/blog.mode';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../models/user.model';

class BlogController {
  /**
   * Create a new blog
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        contentHtml,
        plainText,
        excerpt,
        categories,
        coverImage,
        published,
      } = req.body;

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      // Check if slug already exists
      const existingBlog = await Blog.findOne({ slug });
      if (existingBlog) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Slug already exists' });
      }

      const blogData: Partial<IBlog> = {
        author: (req.user as IUser)?._id,
        title,
        slug,
        contentHtml,
        plainText,
        excerpt,
        categories: categories || [],
        coverImage,
        published: published || false,
        publishedAt: published ? new Date() : undefined,
      };

      const blog = new Blog(blogData);
      await blog.save();

      await blog.populate('author', 'name email');
      res.status(StatusCodes.OK).json(blog);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a blog by ID
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid blog ID' });
      }

      // Handle slug generation if title is being updated
      if (updates.title) {
        updates.slug = updates.title
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        // Check for duplicate slug
        const existingBlog = await Blog.findOne({
          slug: updates.slug,
          _id: { $ne: id },
        });
        if (existingBlog) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: 'Slug already exists' });
        }
      }

      // Handle publishedAt update if published status is changing
      if (updates.published === true) {
        updates.publishedAt = new Date();
      } else if (updates.published === false) {
        updates.publishedAt = undefined;
      }

      const blog = await Blog.findByIdAndUpdate(
        id,
        { ...updates },
        { new: true, runValidators: true },
      ).populate('author', 'name email');

      if (!blog) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Blog not found' });
      }

      res.json(blog);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get list of blogs with filters and pagination
   */
  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        category,
        author,
        q, // search query
        page = '1',
        limit = '10',
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = req.query;

      // Build filter object
      const filter: any = {};

      // Category filter
      if (category) {
        filter.categories = category;
      }

      // Author filter
      if (author) {
        if (!mongoose.Types.ObjectId.isValid(author as string)) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: 'Invalid author ID' });
        }
        filter.author = author;
      }

      // Search query filter (search in title and plainText)
      if (q) {
        filter.$or = [
          { title: { $regex: q, $options: 'i' } },
          { plainText: { $regex: q, $options: 'i' } },
        ];
      }

      // Pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Sorting
      const sort: any = {};
      sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

      // Execute query
      const blogs = await Blog.find(filter)
        .populate('author', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(limitNum);

      // Get total count for pagination
      const total = await Blog.countDocuments(filter);
      const totalPages = Math.ceil(total / limitNum);

      res.json({
        blogs,
        pagination: {
          current: pageNum,
          total: totalPages,
          items: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get blog by slug
   */
  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      const blog = await Blog.findOne({ slug }).populate(
        'author',
        'name email',
      );

      if (!blog) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Blog not found' });
      }

      res.json(blog);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get blog by ID
   */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: false, error: 'Invalid blog ID' });
      }

      const blog = await Blog.findById(id).populate('author', 'name email');

      if (!blog) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ status: false, error: 'Blog not found' });
      }

      res.json(blog);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a blog by ID
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid blog ID' });
      }

      const blog = await Blog.findByIdAndDelete(id);

      if (!blog) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Blog not found' });
      }

      res.json({ status: true, message: 'Blog deleted successfully' });
    } catch (error) {
      next(error);
      // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      //   error: error instanceof Error ? error.message : String(error),
      // });
    }
  }

  /**
   * Increment likes count
   */
  async like(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid blog ID' });
      }

      const blog = await Blog.findByIdAndUpdate(
        id,
        { $inc: { likesCount: 1 } },
        { new: true },
      );

      if (!blog) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Blog not found' });
      }

      res.json({ likesCount: blog.likesCount });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Increment comments count
   */
  async incrementCommentsCount(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid blog ID' });
      }

      const blog = await Blog.findByIdAndUpdate(
        id,
        { $inc: { commentsCount: 1 } },
        { new: true },
      );

      if (!blog) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Blog not found' });
      }

      res.json({ commentsCount: blog.commentsCount });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get blogs by category
   */
  async getByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;
      const { page = '1', limit = '10' } = req.query;

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const blogs = await Blog.find({ categories: category })
        .populate('author', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      const total = await Blog.countDocuments({ categories: category });

      res.json({
        blogs,
        pagination: {
          current: pageNum,
          total: Math.ceil(total / limitNum),
          items: total,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BlogController();
