import { api } from "@/utils";
import { User } from "./user.schema";

export const userApi = {
  getAll: async () => {
    const { data } = await api<User[]>("/users");
    return data;
  },

  getOne: async (id: number) => {
    return await api<User>(`/users/${id}`);
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  },

  update: async (id: number, dto: User) => {
    const { data } = await api.patch(`/users/${id}`, dto);
    return data;
  },

  create: async (dto: User) => {
    const { data } = await api.post<User>("/users", dto);
    return data;
  },
};
