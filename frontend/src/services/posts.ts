import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Pagination, Post } from '@/utils/types';

import api from '@/lib/axios';

// ---- Create Post ----
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Post>) =>
      api.post('/posts/create', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// ---- Update Post ----
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
      api.put(`/posts/update/${id}`, data).then((res) => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
};

// ---- Delete Post ----
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/posts/delete/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// ---- Get All Posts (with filters & pagination) ----
export const usePosts = (params?: {
  category?: string;
  author?: string;
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) =>
  useQuery<{ posts: Post[]; pagination: Pagination }>({
    queryKey: ['posts', params],
    queryFn: () =>
      api.get('/posts/getList', { params }).then((res) => res.data),
  });

// ---- Get Post by ID ----
export const usePostById = (id?: string) =>
  useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => api.get(`/posts/getById/${id}`).then((res) => res.data),
    enabled: !!id,
  });

// ---- Get Post by Slug ----
export const usePostBySlug = (slug?: string) =>
  useQuery<Post>({
    queryKey: ['post-slug', slug],
    queryFn: () =>
      api.get(`/posts/getBySlug/slug/${slug}`).then((res) => res.data),
    enabled: !!slug,
  });

// ---- Like a Post ----
export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.patch(`/posts/like/${id}/like`).then((res) => res.data),
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
        .patch(`/posts/incrementCommentsCount/${id}/comment`)
        .then((res) => res.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
};

// ---- Get Posts by Category ----
export const usePostsByCategory = (
  category?: string,
  params?: { page?: number; limit?: number },
) =>
  useQuery<{ posts: Post[]; pagination: Pagination }>({
    queryKey: ['posts-category', category, params],
    queryFn: () =>
      api
        .get(`/posts/getByCategory/${category}`, { params })
        .then((res) => res.data),
    enabled: !!category,
  });
