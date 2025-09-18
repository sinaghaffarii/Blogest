import sanitizeHtml from 'sanitize-html';

export const plainTextFromHtml = (html: string): string => {
  const clean = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  return clean.replace(/\s+/g, ' ').trim();
};
