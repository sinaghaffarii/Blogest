import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash';
import {
  clearAuthCookies,
  generateAccessToken,
  generateRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
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
      if (existing) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exists');
      }

      const hashed = await hashPassword(password);
      const user = await User.create({
        email,
        password: hashed,
        name,
        role: 'reader',
        isVerified: false,
      });

      // تولید OTP
      const otp = generateOtp();
      const expires = new Date(Date.now() + 10 * 60 * 1000);

      user.otp = otp;
      user.otpExpires = expires;
      await user.save();

      try {
        await sendEmail(
          email,
          'Email Verification',
          `Your verification code is: ${otp}. It will expire in 10 minutes.`,
        );
      } catch (err) {
        await User.findByIdAndDelete(user._id);
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to send verification email',
        );
      }

      res.status(StatusCodes.CREATED).json({
        status: true,
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
      if (!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found!');
      }

      if (!user.isVerified) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          'Please verify your email first',
        );
      }

      if (!user.password) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Please use social login');
      }

      const match = await comparePassword(password, user.password);
      if (!match) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'email or password is incorrect');
      }

      // ساخت توکن‌ها
      const accessToken = generateAccessToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });

      // ذخیره refreshToken در مدل User
      user.refreshToken = refreshToken;
      await user.save();

      // ست کوکی‌ها
      setAccessTokenCookie(res, accessToken);
      setRefreshTokenCookie(res, refreshToken);

      res.status(StatusCodes.OK).json({
        status: true,
        message: 'Login successful',
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
  public async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });

      if (!user) throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found');
      if (user.otp !== otp)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid OTP');
      if (user.otpExpires && user.otpExpires < new Date()) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP expired');
      }

      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res
        .status(StatusCodes.OK)
        .json({ status: true, message: 'Email verified successfully' });
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
  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const oldRefreshToken = req.cookies.refreshToken;
      if (!oldRefreshToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token required');
      }

      const user = await User.findOne({ refreshToken: oldRefreshToken });
      if (!user) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
      }

      let payload: any;
      try {
        payload = verifyRefreshToken(oldRefreshToken);
      } catch {
        user.refreshToken = null;
        await user.save();
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
      }

      if (!payload || payload.id !== user._id.toString()) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token-user mismatch');
      }

      // ساخت توکن‌های جدید
      const newAccessToken = generateAccessToken({ id: user._id });
      const newRefreshToken = generateRefreshToken({ id: user._id });

      user.refreshToken = newRefreshToken;
      await user.save();

      setAccessTokenCookie(res, newAccessToken);
      setRefreshTokenCookie(res, newRefreshToken);

      res.status(StatusCodes.OK).json({ message: 'Token refreshed' });
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
      const expires = new Date(Date.now() + 10 * 60 * 1000);

      user.otp = otp;
      user.otpExpires = expires;
      await user.save();

      await sendEmail(
        email,
        'Password Reset OTP',
        `Your password reset code is: ${otp}. It will expire in 10 minutes.`,
      );

      res.status(StatusCodes.OK).json({
        status: true,
        message: 'OTP sent to email for password reset',
      });
    } catch (error) {
      next(error);
    }
  }
  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp, newPassword } = req.body;
      const user = await User.findOne({ email });

      if (!user) throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found');
      if (user.otp !== otp)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid OTP');
      if (user.otpExpires && user.otpExpires < new Date()) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP expired');
      }

      user.password = await hashPassword(newPassword);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res
        .status(StatusCodes.OK)
        .json({ status: true, message: 'Password reset successful' });
    } catch (error) {
      next(error);
    }
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        const user = await User.findOne({ refreshToken });
        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      }

      clearAuthCookies(res);
      res
        .status(StatusCodes.OK)
        .json({ status: true, message: 'Logout successful' });
    } catch (error) {
      next(error);
    }
  }
  public async checkAuth(req: Request, res: Response) {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: false,
        message: 'User is not authenticated',
      });
    }

    return res.status(StatusCodes.OK).json({
      status: true,
      message: 'User is authenticated',
      data: req.user,
    });
  }
}

export default new AuthController();
