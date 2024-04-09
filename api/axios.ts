import axios from "axios";
import { API_URL, AUTH_TOKEN } from "./constants";
import { getData } from "@/storage/async-storage";

export const defaultInstance = axios.create({
  baseURL: API_URL,
});

export const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getData("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
