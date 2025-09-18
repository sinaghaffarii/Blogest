import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'li', 'br'],
  allowedAttributes: {
    a: ['href', 'target'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
};

const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') return sanitizeHtml(obj, sanitizeOptions);
  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach((key) => {
      obj[key] = sanitizeObject(obj[key]);
    });
  }
  return obj;
};

export const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.body = sanitizeObject(req.body);
  req.query = sanitizeObject(req.query);
  req.params = sanitizeObject(req.params);
  next();
};
