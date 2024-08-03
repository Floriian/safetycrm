import { api } from "@/utils";
import { Client } from "./client.schema";

export const clientApi = {
  create: async (data: Client) => {
    return await api.post<Client>("/clients", data);
  },
  getAll: async () => {
    const { data } = await api<Client[]>("/clients");
    return data;
  },
};
