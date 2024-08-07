"use server";

import { logError } from "@/utils";
import { ruleApi } from "./rule.api";

export const getAllRules = async () => {
  try {
    return await ruleApi.findAll();
  } catch (e) {
    logError("getRules", e);
  }
};

export const getOneRuleById = async (id: number) => {
  try {
    return await ruleApi.findOneById(id);
  } catch (e) {
    logError("getOneRuleById", e);
  }
};

export const getAllParentRules = async () => {
  try {
    return await ruleApi.getAllParents();
  } catch (e) {
    logError("getAllParentRules", e);
  }
};
