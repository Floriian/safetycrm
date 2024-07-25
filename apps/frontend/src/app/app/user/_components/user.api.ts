import { api } from "@/utils";
import { User } from "./user.schema";

export const userApi = {
  getAll: async () => {
    const { data } = await api<User[]>("/users");
    return data;
  },
};
