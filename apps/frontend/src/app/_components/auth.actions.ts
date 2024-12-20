"use server";

import { cookies } from "next/headers";
import { authSchema, AuthSchema } from "./auth.schema";
import { CONSTANTS } from "@/constants";
import { authApi } from "./auth.api";
import { Axios, AxiosError, HttpStatusCode } from "axios";
import { redirect } from "next/navigation";
import { cache } from "react";
import { handleError } from "@/utils";
import { User } from "../app/user/_components/user.schema";
import { unstable_cache } from "next/cache";

export const loginAction = async (
  data: AuthSchema
): Promise<{
  success?: boolean;
  message?: string;
  errors?: any;
}> => {
  const valdiateFields = authSchema.safeParse(data);

  if (!valdiateFields.success) {
    return { errors: valdiateFields.error.flatten().fieldErrors };
  }

  try {
    const response = await authApi.login(data);

    cookies().set(CONSTANTS.cookies.AUTH_COOKIE, response.data.access_token, {
      httpOnly: true,
    });

    return {
      success: true,
    };
  } catch (e) {
    handleError("loginAction", e);
    return { success: false, message: "Invalid credentials" };
  }
};

interface GetCurrentUser {
  status?: number;
  user?: User;
  sessionExpired: boolean;
}
export const getCurrentUser = cache(async () => {
  try {
    const { data, status } = await authApi.me();
    return {
      sessionExpired: false,
      status,
      user: data,
    } satisfies GetCurrentUser;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === HttpStatusCode.Unauthorized) {
        return {
          sessionExpired: true,
        } satisfies GetCurrentUser;
      }
    }
    handleError("getCurrentUser", e);
  }
});
