"use server";

import { cookies } from "next/headers";
import { authSchema, AuthSchema } from "./auth.schema";
import { CONSTANTS } from "@/constants";
import { authApi } from "./auth.api";
import { Axios, AxiosError, HttpStatusCode } from "axios";
import { redirect } from "next/navigation";
import { cache } from "react";

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
  } catch (e) {
    return { success: false, message: "Invalid credentials" };
  }

  redirect("/app");
};

export const getCurrentUser = cache(async () => {
  try {
    return await authApi.me();
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === HttpStatusCode.Unauthorized) redirect("/");
    }
    console.log(e);
  }
});
