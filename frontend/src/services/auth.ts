import { useMutation, useQuery } from '@tanstack/react-query';

import api from '@/lib/axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// ---- Register ----
export const useRegister = () =>
  useMutation({
    mutationFn: (data: { email: string; password: string; name: string }) =>
      api.post('/auth/register', data).then((res) => res.data),
  });

// ---- Login ----
export const useLogin = () =>
  useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post('/auth/login', data).then((res) => res.data),
  });

// ---- Verify Email ----
export const useVerifyEmail = () =>
  useMutation({
    mutationFn: (data: { email: string; otp: string }) =>
      api.post('/auth/verify-email', data).then((res) => res.data),
  });

// ---- Forgot Password ----
export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: { email: string }) =>
      api.post('/auth/forgot-password', data).then((res) => res.data),
  });

// ---- Reset Password ----
export const useResetPassword = () =>
  useMutation({
    mutationFn: (data: { email: string; otp: string; newPassword: string }) =>
      api.post('/auth/reset-password', data).then((res) => res.data),
  });

// ---- Logout ----
export const useLogout = () =>
  useMutation({
    mutationFn: () => api.post('/auth/logout').then((res) => res.data),
  });

// ---- Check Auth ----
export const useCheckAuth = () =>
  useQuery<User>({
    queryKey: ['checkAuth'],
    queryFn: () => api.get('/auth/check').then((res) => res.data),
    retry: false,
  });
