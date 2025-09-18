import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { ApiError } from './errorHandler';
import { StatusCodes } from 'http-status-codes';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Authorization header missing'));
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer')
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid authorization header'));

  try {
    const payload: any = jwt.verify(parts[1], JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return next(new ApiError(StatusCodes.UNAUTHORIZED, 'User not found'));
    (req as any).user = { id: user._id, role: user.role, email: user.email };
    next();
  } catch (err) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token'));
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return next(new ApiError(StatusCodes.FORBIDDEN, 'No user in request'));
    if (!roles.includes(user.role)) {
      return next(new ApiError(StatusCodes.FORBIDDEN, 'Insufficient permissions'));
    }
    next();
  };
};
