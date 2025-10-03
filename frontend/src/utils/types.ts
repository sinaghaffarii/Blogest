// ---- Types ----

export interface Pagination {
  current: number;
  total: number;
  items: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface Blog {
  content: any;
  _id: string;
  author: {
    [x: string]: string | Blob | undefined;
    _id: string;
    name: string;
    email: string;
  };
  title: string;
  slug: string;
  contentHtml: string;
  plainText: string;
  excerpt?: string;
  categories: string[];
  coverImage?: string;
  likesCount: number;
  commentsCount: number;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
