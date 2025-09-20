import axios from 'axios';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor (می‌تونی header خاص هم ست کنی اینجا)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // اگر 401 گرفتیم و هنوز retry نکردیم
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/auth/refresh-token'); // همون refreshToken کنترلرت
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        Swal.fire(
          'خطا',
          'نشست شما منقضی شده است، لطفا دوباره وارد شوید',
          'error',
        );
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // سایر خطاها
    const message = error.response?.data?.message || 'خطای ناشناخته‌ای رخ داد';
    toast.error(message);

    return Promise.reject(error);
  },
);

export default api;
