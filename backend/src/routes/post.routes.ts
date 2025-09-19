import { Router } from 'express';
import postController from '../controllers/post.controller';
import { authorizeRoles } from '../middlewares/auth';
import { verifyAccessToken } from '../utils/jwt';

const router = Router();

router.post(
  '/',
  verifyAccessToken,
  authorizeRoles('admin', 'author'),
  postController.create.bind(postController),
);
router.get('/:slug', postController.getBySlug.bind(postController));
// add update, delete, list, filter by category, search etc.

export default router;
