import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';
import { generateOtp } from '../utils/otp';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../middlewares/errorHandler';
import { sendEmail } from '../utils/mailer';

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const existing = await User.findOne({ email });
      if (existing)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exists');

      const hashed = await hashPassword(password);
      const user = await User.create({
        email,
        password: hashed,
        name,
        role: 'reader',
        isVerified: false,
      });

      // Generate verification OTP after registration
      const otp = generateOtp();
      const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      user.otp = otp;
      user.otpExpires = expires;
      await user.save();

      try {
        // Send verification email
        const subject = 'sinaghaffari18@gmail.com';
        const message = `Your verification code is: ${otp}. It will expire in 10 minutes.`;
        await sendEmail(email, subject, message);
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
      }

      res.status(StatusCodes.CREATED).json({
        message: 'Registered successfully. Please verify your email.',
        user: { id: user._id, email: user.email, name: user.name },
      });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid credentials');

      // Check if user is verified
      if (!user.isVerified) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          'Please verify your email first',
        );
      }

      // For OAuth users without password
      if (!user.password) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Please use social login');
      }

      const match = await comparePassword(password, user.password);
      if (!match)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid credentials');

      const accessToken = generateAccessToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });

      user.refreshToken = refreshToken;
      await user.save();

      res.status(StatusCodes.OK).json({
        message: 'Login successful',
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      // Implementation for Google OAuth
      // This would typically handle the OAuth callback
      // For now, we'll keep it as not implemented
      res
        .status(StatusCodes.NOT_IMPLEMENTED)
        .json({ message: 'Google login not implemented yet' });
    } catch (error) {
      next(error);
    }
  }

  public async githubLogin(req: Request, res: Response, next: NextFunction) {
    try {
      // Implementation for GitHub OAuth
      res
        .status(StatusCodes.NOT_IMPLEMENTED)
        .json({ message: 'GitHub login not implemented yet' });
    } catch (error) {
      next(error);
    }
  }

  public async requestVerificationOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

      if (user.isVerified) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already verified');
      }

      const otp = generateOtp();
      const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      user.otp = otp;
      user.otpExpires = expires;
      await user.save();

      const subject = 'sinaghaffari18@gmail.com';
      const message = `Your verification code is: ${otp}. It will expire in 10 minutes.`;
      await sendEmail(email, subject, message);

      res
        .status(StatusCodes.OK)
        .json({ message: 'Verification OTP sent to email' });
    } catch (error) {
      next(error);
    }
  }

  public async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });

      if (
        !user ||
        user.otp !== otp ||
        (user.otpExpires && user.otpExpires < new Date())
      ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid or expired OTP');
      }

      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res
        .status(StatusCodes.OK)
        .json({ message: 'Email verified successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken)
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token required');

      const payload = verifyRefreshToken(refreshToken) as any;
      const user = await User.findById(payload.id);
      if (!user || user.refreshToken !== refreshToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
      }

      const newAccessToken = generateAccessToken({ id: user._id });
      res
        .status(StatusCodes.OK)
        .json({ message: 'Token refreshed', accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

      const otp = generateOtp();
      const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      user.otp = otp;
      user.otpExpires = expires;
      await user.save();

      const subject = 'Password Reset OTP';
      const message = `Your password reset code is: ${otp}. It will expire in 10 minutes.`;
      await sendEmail(email, subject, message);

      res
        .status(StatusCodes.OK)
        .json({ message: 'OTP sent to email for password reset' });
    } catch (error) {
      next(error);
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp, newPassword } = req.body;
      const user = await User.findOne({ email });

      if (
        !user ||
        user.otp !== otp ||
        (user.otpExpires && user.otpExpires < new Date())
      ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid or expired OTP');
      }

      user.password = await hashPassword(newPassword);
      user.otp = undefined;
      user.otpExpires = undefined;

      await user.save();

      res.status(StatusCodes.OK).json({ message: 'Password reset successful' });
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = (req as any).user;
      await User.findByIdAndUpdate(id, { refreshToken: null });
      res.status(StatusCodes.OK).json({ message: 'Logout successful' });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
