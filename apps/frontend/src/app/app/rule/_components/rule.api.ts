import { api } from "@/utils";
import type { CreateOrEditRule, Rule } from "./rule.schema";
export const ruleApi = {
  findAllWithTreeStructure: async () => {
    const { data } = await api<Rule[]>(`/rules`);
    return data;
  },
  findOneById: async (id: number) => {
    const { data } = await api<Rule>(`/rules/${id}`);
    return data;
  },
  getAll: async (urlQuery?: string) => {
    const { data } = await api<Rule[]>(`/rules/all${urlQuery}`);
    return data;
  },
  create: async (_data: CreateOrEditRule) => {
    const { data } = await api.post<Rule>("/rules", _data);
    return data;
  },
  delete: async (id: number) => {
    const { data } = await api.delete(`/rules/${id}`);
    return data;
  },
};
