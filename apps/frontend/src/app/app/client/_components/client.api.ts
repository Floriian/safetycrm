import { api } from "@/utils";
import { Client } from "./client.schema";
import { ApiUpdateResponse } from "@/types";

export const clientApi = {
  create: async (data: Client) => {
    return await api.post<Client>("/clients", data);
  },
  getAll: async () => {
    const { data } = await api<Client[]>("/clients");
    return data;
  },

  getOneById: async (id: number) => {
    const { data } = await api<Client>(`/clients/${id}`);
    return data;
  },

  updateById: async (id: number, _data: Client) => {
    const { data } = await api.patch<ApiUpdateResponse>(
      `/clients/${id}`,
      _data
    );
    return data;
  },
};
