import express from 'express';
import postController from '../controllers/post.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth';

const router = express.Router();

//Public routes
router.get('/getList', postController.getList.bind(postController));
router.get(
  '/getBySlub/slug/:slug',
  postController.getBySlug.bind(postController),
);
router.get(
  '/getByCategory/:category',
  postController.getByCategory.bind(postController),
);
router.get('/getById/:id', postController.getById.bind(postController));

// Protected routes (require authentication)
router.post(
  '/create',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  postController.create.bind(postController),
);
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  postController.update.bind(postController),
);
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  postController.delete.bind(postController),
);
router.patch(
  '/like/:id/like',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  postController.like.bind(postController),
);
router.patch(
  '/incrementCommentsCount/:id/comment',
  authenticateToken,
  authorizeRoles('admin', 'author'),
  postController.incrementCommentsCount.bind(postController),
);

export default router;
