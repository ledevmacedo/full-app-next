import axios, { type AxiosInstance } from "axios";
import type { AxiosErrorResponse } from "./errorHandler";
import { API_URL_APP, URL_BASE_APP, API_KEY } from "@/constants";

const configureInstance = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status || 500;
      const message = error.message;
      return Promise.reject<AxiosErrorResponse>({ status, message });
    }
  );
  return instance;
};

export const globalInstance = (jwt: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL_APP,
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      "api-key": API_KEY,
      Authorization: `Bearer ${jwt}`,
    },
  });
  return configureInstance(instance);
};

export const jwtInstance = (jwt: string | null): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL_APP,
    headers: {
      "ngrok-skip-browser-warning": "true",
      "api-key": API_KEY,
      Authorization: `Bearer ${jwt}`,
    },
  });
  return configureInstance(instance);
};

export const simpleInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL_APP,
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      "api-key": API_KEY,
    },
  });
  return configureInstance(instance);
};

export const localInstance = (jwt: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: URL_BASE_APP,
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      "api-key": API_KEY,
      Authorization: `Bearer ${jwt}`,
    },
  });
  return configureInstance(instance);
};
