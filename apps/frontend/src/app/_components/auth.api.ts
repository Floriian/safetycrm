import { api } from "@/utils";
import { AuthSchema } from "./auth.schema";
import { User } from "../app/user/_components/user.schema";

export const authApi = {
  login: async (data: AuthSchema) => {
    return await api.post<{ access_token: string }>("/auth/sign-in", data);
  },
  me: async () => {
    const { data, status } = await api<User>("/auth/me");
    return { data, status };
  },
};
