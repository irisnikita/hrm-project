import axios from 'axios';
import * as Sentry from '@sentry/nextjs';
import { handleError } from '@/lib';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    try {
      const errorResponse = error.response?.data;

      // Capture the error and send it to Sentry
      Sentry.captureException(error, {
        tags: {
          endpoint: error.config?.url,
          method: error.config?.method,
        },
        extra: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          response: JSON.stringify(errorResponse),
        },
      });
    } catch (sentryError) {
      // Handle any errors that occur while capturing the error with Sentry
      handleError(sentryError as Error);
    }

    // Return a resolved promise to prevent throwing the error
    return Promise.resolve(error.response);
  },
);

export default axiosInstance;
