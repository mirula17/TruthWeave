import axios from 'axios';
import { toast } from 'sonner';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Attach Authorization header if JWT token is stored
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tw_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Unified response error interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error('Unable to connect to TruthWeave backend.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const detailMsg = typeof data?.detail === 'string' ? data.detail : null;

    switch (status) {
      case 401:
        toast.error(detailMsg || 'Your session has expired. Please log in again.');
        localStorage.removeItem('tw_token');
        localStorage.removeItem('tw_user');
        break;
      case 403:
        toast.error(detailMsg || 'You do not have permission to access this resource.');
        break;
      case 404:
        toast.error(detailMsg || 'Requested resource was not found.');
        break;
      case 422:
        toast.error('Invalid submission format. Please check your inputs.');
        break;
      case 500:
        toast.error('Server error. Please try again.');
        break;
      default:
        if (status >= 400 && status < 500 && detailMsg) {
          toast.error(detailMsg);
        }
        break;
    }

    return Promise.reject(error);
  }
);
