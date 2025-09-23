import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class ApiError extends Error {
  statusCode: number;
  details?: any;

  constructor(statusCode: number, message?: string, details?: any) {
    super(message || getReasonPhrase(statusCode));
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error handler caught:', err);

  // Express "Not Found"
  if (err.status === StatusCodes.NOT_FOUND && err.message?.includes('Cannot')) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: getReasonPhrase(StatusCodes.NOT_FOUND),
      message: 'The requested resource was not found',
      statusCode: StatusCodes.NOT_FOUND,
    });
  }

  // Custom ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: getReasonPhrase(err.statusCode),
      message: err.message,
      statusCode: err.statusCode,
      ...(err.details && { details: err.details }),
    });
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: getReasonPhrase(StatusCodes.BAD_REQUEST),
      message: 'Invalid ID format',
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Validation Error',
      message: 'Validation failed',
      statusCode: StatusCodes.BAD_REQUEST,
      details: errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(StatusCodes.CONFLICT).json({
      error: getReasonPhrase(StatusCodes.CONFLICT),
      message: 'Duplicate entry',
      statusCode: StatusCodes.CONFLICT,
    });
  }

  // Default / Unknown errors
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    error: getReasonPhrase(statusCode),
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message || 'Internal server error',
    statusCode,
    ...(err.details && !isProd && { details: err.details }),
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }), // only in dev
  });
};
