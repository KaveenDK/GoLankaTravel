import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// 1. Create Axios Instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attach Access Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 3. Response Interceptor: Handle Token Refresh
api.interceptors.response.use(
  (response) => response, 
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Check if error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        console.log('🔄 Access Token expired. Attempting refresh...');
        
        const refreshResponse = await axios.get('http://localhost:5000/api/v1/auth/refresh', {
            withCredentials: true 
        });

        const newAccessToken = refreshResponse.data.data.accessToken;

        // Save new token to LocalStorage
        localStorage.setItem('token', newAccessToken);

        // Update authorization header for the original request
        if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Retry the original request with the new token
        return api(originalRequest);

      } catch (refreshError) {
        console.error('❌ Session expired. User must login again.');
        
        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        // Redirect to login page
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;