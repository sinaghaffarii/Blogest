import { Router } from 'express';
import UserController from '../controllers/user.controller';
import {
  authenticateToken,
  authorizeRoles,
  authorizeSelfOrAdmin,
} from '../middlewares/auth';

const router = Router();

router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  UserController.getAllUsers.bind(UserController),
);

router.get(
  '/:id',
  authenticateToken,
  authorizeSelfOrAdmin(), // اگر کاربر خودش لاگین بود فقط میتونه دیتای خودش رو آپدیت کنه یا دریافت کنه
  authorizeRoles('admin'),
  UserController.getUserById.bind(UserController),
);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  UserController.createUser.bind(UserController),
);

router.put(
  '/:id',
  authenticateToken,
  authorizeSelfOrAdmin(),
  authorizeRoles('admin'),
  UserController.updateUser.bind(UserController),
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  UserController.deleteUser.bind(UserController),
);

export default router;
