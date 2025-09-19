import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/verify-email', authController.verifyEmail.bind(authController));
router.post('/google', authController.googleLogin.bind(authController));
router.post('/github', authController.githubLogin.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
router.post(
  '/forgot-password',
  authController.forgotPassword.bind(authController),
);
router.post(
  '/reset-password',
  authController.resetPassword.bind(authController),
);
router.post(
  '/logout',
  authenticateToken,
  authController.logout.bind(authController),
);

export default router;
