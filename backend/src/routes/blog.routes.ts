import express from 'express';
import blogController from '../controllers/blog.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth';

const router = express.Router();

//Public routes
router.get('/getList', blogController.getList.bind(blogController));
router.get(
  '/getBySlug/slug/:slug',
  blogController.getBySlug.bind(blogController),
);
router.get(
  '/getByCategory/:category',
  blogController.getByCategory.bind(blogController),
);
router.get('/getById/:id', blogController.getById.bind(blogController));

// Protected routes (require authentication)
router.post(
  '/create',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  blogController.create.bind(blogController),
);
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  blogController.update.bind(blogController),
);
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  blogController.delete.bind(blogController),
);
router.patch(
  '/like/:id/like',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  blogController.like.bind(blogController),
);
router.patch(
  '/incrementCommentsCount/:id/comment',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  blogController.incrementCommentsCount.bind(blogController),
);

export default router;
