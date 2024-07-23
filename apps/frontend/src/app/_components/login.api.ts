import { api } from "@/utils";
import { AuthSchema } from "./auth.schema";

export const authApi = {
  login: async (data: AuthSchema) => {
    return await api.post<{ token: string }>("/auth/sign-in", data);
  },
};
