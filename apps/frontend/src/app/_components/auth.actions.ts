"use server";

import { cookies } from "next/headers";
import { authSchema, AuthSchema } from "./auth.schema";
import { CONSTANTS } from "@/constants";
import { authApi } from "./login.api";

export const loginAction = async (data: AuthSchema) => {
  const valdiateFields = authSchema.safeParse(data);

  if (!valdiateFields.success) {
    return { errors: valdiateFields.error.flatten().fieldErrors };
  }

  const response = await authApi.login(data);

  cookies().set(CONSTANTS.cookies.AUTH_COOKIE, response.data.token, {
    httpOnly: true,
  });

  return { success: true };
};
