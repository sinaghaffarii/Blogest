import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../middlewares/errorHandler';

class UserController {
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({ role: { $ne: 'admin' } }).select(
        '-password -refreshToken -otp -otpExpires',
      );
      res.status(StatusCodes.OK).json({
        status: true,
        message: 'Users fetched successfully',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select(
        '-password -refreshToken -otp -otpExpires',
      );

      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      res.status(StatusCodes.OK).json({
        status: true,
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, role } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exists');
      }

      const user = await User.create({
        email,
        name,
        role: role || 'reader',
        isVerified: true, // چون ادمین ساخته، فرض می‌کنیم تایید شده
      });

      res.status(StatusCodes.CREATED).json({
        status: true,
        message: 'User created successfully',
        data: {
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

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, role, avatar } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        { name, role, avatar },
        { new: true, runValidators: true },
      ).select('-password -refreshToken -otp -otpExpires');

      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      res.status(StatusCodes.OK).json({
        status: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      res.status(StatusCodes.OK).json({
        status: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
