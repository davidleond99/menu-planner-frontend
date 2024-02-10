/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const customAxiosConfig = (url: string) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json;charset=UTF-8",
    },
    baseURL: url,
  };

  return axiosConfig;
};

export const customAxiosAppWithoutAuth = axios.create(
  customAxiosConfig(process.env.REACT_APP_API_URL!)
);
const customAxiosApp = axios.create(
  customAxiosConfig(process.env.REACT_APP_API_URL!)
);

customAxiosApp.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxiosApp.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      localStorage.setItem("expired", "expired");
      window.location.replace("/auth/login");
    } else if (error.response?.status === 304) {
      console.log("here");
      window.location.replace("menuplanner/home");
    }
    return Promise.reject(error);
  }
);

export default customAxiosApp;
