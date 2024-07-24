import { CONSTANTS } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const api = axios.create({
  baseURL: process.env.API_URL ?? "http://localhost:3001",
});

api.interceptors.request.use(
  async (cfg) => {
    const token = cookies().get(CONSTANTS.cookies.AUTH_COOKIE);
    if (token) {
      cfg.headers.Authorization = `Bearer ${token.value}`;
    }
    return cfg;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
