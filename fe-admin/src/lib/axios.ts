import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Tự động đính kèm accessToken
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàng đợi lưu các request bị 401 chờ làm mới token xong để retry
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

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

// Response Interceptor: Silent Refresh Token khi gặp lỗi 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Bỏ qua nếu lỗi không phải 401 hoặc đã retry rồi hoặc là chính request refresh-token
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/refresh-token') ||
      originalRequest.url?.includes('/auth/login')
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Nếu đang có một request làm mới token, đẩy request này vào hàng đợi chờ
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem('admin_refresh_token');

    if (!refreshToken) {
      isRefreshing = false;
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?expired=1';
      }
      return Promise.reject(error);
    }

    try {
      // Dùng axios thuần để gọi refresh-token tránh lặp vô tận interceptor
      const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });

      const data = res.data?.data;
      const newAccessToken = data?.accessToken || data?.token;
      const newRefreshToken = data?.refreshToken;

      if (!newAccessToken) {
        throw new Error('Không nhận được access token mới');
      }

      // Cập nhật token mới vào localStorage
      localStorage.setItem('admin_token', newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem('admin_refresh_token', newRefreshToken);
      }

      // Cập nhật default headers cho các request sau
      apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      // Giải phóng hàng đợi chờ với token mới
      processQueue(null, newAccessToken);

      // Retry lại request ban đầu với accessToken mới
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      return apiClient(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_user');

      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?expired=1';
      }
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;
