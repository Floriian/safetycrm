import { CONSTANTS } from "@/constants";
import { ForbiddenResourceError } from "@/lib/auth";
import axios, { isAxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
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

api.interceptors.response.use(
  async (cfg) => {
    return cfg;
  },
  async (error) => {
    if (isAxiosError<ApiError>(error)) {
      if (error.response?.data.message === "Forbidden resource") {
        throw new ForbiddenResourceError();
      }
    }
    return Promise.reject(error);
  }
);
