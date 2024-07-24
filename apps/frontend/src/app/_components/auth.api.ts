import { api } from "@/utils";
import { AuthSchema } from "./auth.schema";

export const authApi = {
  login: async (data: AuthSchema) => {
    return await api.post<{ access_token: string }>("/auth/sign-in", data);
  },
  me: async () => {
    return await api("/auth/me");
  },
};
