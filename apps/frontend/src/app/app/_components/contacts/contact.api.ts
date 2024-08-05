import { api } from "@/utils";

export const contactApi = {
  delete: async (id: number) => {
    const { data } = await api.delete(`/contacts/${id}`);
    return data;
  },
};
