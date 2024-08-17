import { api } from "@/utils";
import type { CreateOrEditRule, Rule } from "./rule.schema";
import type { ApiUpdateResponse } from "@/types";
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
  update: async (id: number, rule: CreateOrEditRule) => {
    const { data } = await api.patch<ApiUpdateResponse>(`/rules/${id}`, rule);
    return data;
  },
  getAppliedClientRules: async (clientId: number) => {
    const { data } = await api<Rule[]>(`/rules/client/${clientId}`);
    return data;
  },

  getClientNotAppliedRules: async (clientId: number) => {
    const { data } = await api<Rule[]>(`/rules/client/not-applied/${clientId}`);
    return data;
  },
};
