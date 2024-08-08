import { api } from "@/utils";
import type { Rule } from "./rule.schema";
export const ruleApi = {
  findAll: async () => {
    const { data } = await api<Rule[]>("/rules");
    return data;
  },
  findOneById: async (id: number) => {
    const { data } = await api<Rule>(`/rules/${id}`);
    return data;
  },
  getAllRulesWithoutTreeStructure: async () => {
    const { data } = await api<Rule[]>("/rules/all");
    return data;
  },
};
