import axios, { AxiosRequestConfig } from "axios";
import Token from "../components/token/Token";
import { refreshToken } from "./RefreshToken";


const getToken = async (config: AxiosRequestConfig) => {
  const token = await Token();
  const newConfig = { ...config };
  if (newConfig.headers) {
    newConfig.headers.Authorization = token;
  }
  return newConfig;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  }
});

api.interceptors.request.use(getToken);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const RefreshToken = await refreshToken()
      const newRequest = await getToken(originalRequest);
      if (!newRequest.headers) {
        newRequest.headers = {};
      }
      newRequest.headers.Authorization = Token();
      const response = await api(newRequest);
      return response;
    }
    return Promise.reject(error);
  }
);


export default api;
