import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Blog, Pagination } from '@/utils/types';

import api from '@/lib/axios';

// ---- Create Blog ----
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Blog>) =>
      api.post('/blogs/create', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

// ---- Update Blog ----
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Blog> }) =>
      api.put(`/blogs/update/${id}`, data).then((res) => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
};

// ---- Delete Blog ----
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/blogs/delete/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

// ---- Get All Blogs (with filters & pagination) ----
export const useBlogs = (params?: {
  category?: string;
  author?: string;
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) =>
  useQuery<{ blogs: Blog[]; pagination: Pagination }>({
    queryKey: ['blogs', params],
    queryFn: () =>
      api.get('/blogs/getList', { params }).then((res) => res.data),
  });

// ---- Get Blog by ID ----
export const useBlogById = (id?: string) =>
  useQuery<Blog>({
    queryKey: ['post', id],
    queryFn: () => api.get(`/blogs/getById/${id}`).then((res) => res.data),
    enabled: !!id,
  });

// ---- Get Blog by Slug ----
export const useBlogBySlug = (slug?: string) =>
  useQuery<Blog>({
    queryKey: ['post-slug', slug],
    queryFn: () =>
      api.get(`/blogs/getBySlug/slug/${slug}`).then((res) => res.data),
    enabled: !!slug,
  });

// ---- Like a Blog ----
export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.patch(`/blogs/like/${id}/like`).then((res) => res.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
};

// ---- Increment Comments Count ----
export const useIncrementComments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api
        .patch(`/blogs/incrementCommentsCount/${id}/comment`)
        .then((res) => res.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
};

// ---- Get Blogs by Category ----
export const useBlogsByCategory = (
  category?: string,
  params?: { page?: number; limit?: number },
) =>
  useQuery<{ blogs: Blog[]; pagination: Pagination }>({
    queryKey: ['blogs-category', category, params],
    queryFn: () =>
      api
        .get(`/blogs/getByCategory/${category}`, { params })
        .then((res) => res.data),
    enabled: !!category,
  });
