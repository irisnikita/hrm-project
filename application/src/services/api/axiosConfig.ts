import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers[
      "Authorization"
    ] = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
