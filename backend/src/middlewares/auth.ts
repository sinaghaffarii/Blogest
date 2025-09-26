import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { ApiError } from './errorHandler';
import { StatusCodes } from 'http-status-codes';
import { verifyAccessToken } from '../utils/jwt';

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user)
      return next(new ApiError(StatusCodes.FORBIDDEN, 'No user in request'));
    if (!roles.includes(user.role)) {
      return next(
        new ApiError(StatusCodes.FORBIDDEN, 'Insufficient permissions'),
      );
    }
    next();
  };
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(
        new ApiError(StatusCodes.UNAUTHORIZED, 'Access token required'),
      );
    }

    const payload = verifyAccessToken(token) as any;
    const user = await User.findById(payload.id);

    if (!user) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'User not found'));
    }

    (req as any).user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token'));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token expired'));
    } else {
      next(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Authentication failed',
        ),
      );
    }
  }
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      const payload = verifyAccessToken(token) as any;
      const user = await User.findById(payload.id);

      if (user) {
        (req as any).user = user;
      }
    }

    next();
  } catch (error) {
    // در صورت خطا، کاربر را به صورت ناشناس ادامه دهید
    next(error);
  }
};

export const authorizeSelfOrAdmin = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user.role === 'admin') return next();
    if (user._id.toString() === req.params.id) return next();

    return next(new ApiError(StatusCodes.FORBIDDEN, 'Access denied'));
  };
};
