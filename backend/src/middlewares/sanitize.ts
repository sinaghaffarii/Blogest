import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'b',
    'i',
    'em',
    'strong',
    'a',
    'p',
    'ul',
    'li',
    'br',
    'img',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'code',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'figure',
    'figcaption',
    'span',
    'div',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
    '*': ['style', 'class'],
  },
  allowedStyles: {
    '*': {
      // allow a few safe CSS properties
      color: [/^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/],
      'text-align': [/^left$|^right$|^center$|^justify$/],
      float: [/^left$|^right$/],
    },
  },
  allowedSchemes: ['http', 'https', 'mailto', 'data'],
  transformTags: {
    a: (tagName, attribs) => {
      attribs.target = '_blank';
      attribs.rel = 'noopener noreferrer';
      return { tagName, attribs };
    },
  },
};

const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') return sanitizeHtml(obj, sanitizeOptions);
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
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
