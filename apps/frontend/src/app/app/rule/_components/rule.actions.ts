"use server";

import { createUrlQuery, handleError } from "@/utils";
import { ruleApi } from "./rule.api";
import {
  ApiError,
  CreateResponse,
  DeleteResponse,
  UpdateResponse,
} from "@/types";
import { CreateOrEditRule, Rule } from "./rule.schema";
import { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getTreeRule = async () => {
  try {
    return await ruleApi.findAllWithTreeStructure();
  } catch (e) {
    handleError("getRules", e);
  }
};

export const getOneRuleById = async (id: number) => {
  try {
    return await ruleApi.findOneById(id);
  } catch (e) {
    handleError("getOneRuleById", e);
  }
};

export const getAllRules = async (
  searchBy?: Partial<Record<keyof Rule, unknown>> & {
    orderFields?: Array<keyof Rule>;
  }
) => {
  try {
    const createUrlQueryObject = {
      ...searchBy,
      orderByFields: searchBy?.orderFields?.join(","),
    };
    const urlQueries = searchBy && createUrlQuery(createUrlQueryObject);
    return await ruleApi.getAll(urlQueries ? urlQueries : "");
  } catch (e) {
    handleError("searchRules", e);
  }
};

export const createRule = async (rule: CreateOrEditRule) => {
  try {
    const data = await ruleApi.create(rule);
    revalidatePath(`/app/rule`, "layout");
    revalidatePath(`/app/rule/new`, "layout");
    revalidatePath(`/app/rule/${data.id}`, "layout");
    return { success: true, data } satisfies CreateResponse<Rule>;
  } catch (e) {
    if (isAxiosError<ApiError>(e)) {
      return {
        success: false,
        data: e.response?.data,
      } satisfies CreateResponse<ApiError>;
    }
    handleError("createRule", e);
  }
};

export const deleteRule = async (id: number) => {
  try {
    revalidatePath("/app/rule", "layout");
    await ruleApi.delete(id);
    return { success: true } satisfies DeleteResponse;
  } catch (e) {
    return { success: false } satisfies DeleteResponse;
    handleError("deleteRule", e);
  }
};

export const updateRule = async (id: number, _data: CreateOrEditRule) => {
  try {
    const response = await ruleApi.update(id, _data);
    await revalidatePath(`/app/rule/${id}`);
    return {
      success: true,
    } satisfies UpdateResponse<Rule>;
  } catch (e) {
    if (isAxiosError<ApiError>(e)) {
      return {
        data: e.response?.data,
        success: false,
      } satisfies UpdateResponse<ApiError>;
    }
    handleError("updateRule", e);
  }
};

export const getAppliedClientRules = async (clientId: number) => {
  try {
    return await ruleApi.getAppliedClientRules(clientId);
  } catch (e) {
    handleError("getAppliedClientRules", e);
  }
};

export const getNotAppliedClientRules = async (clientId: number) => {
  try {
    return await ruleApi.getClientNotAppliedRules(clientId);
  } catch (e) {
    handleError("getNotAppliedClientRules", e);
  }
};

export const assignRuleToClient = async (ruleId: number, clientId: number) => {
  try {
    const response = await ruleApi.assignRuleToClient({ clientId, ruleId });
    revalidatePath(`/app/manager/${clientId}`);
    return response;
  } catch (e) {
    handleError("assignRuleToClient", e);
  }
};

export const deassignRuleToClient = async (
  ruleId: number,
  clientId: number
) => {
  try {
    const response = await ruleApi.deassignRuleToClient({ clientId, ruleId });
    revalidatePath(`/app/manager/${clientId}`);
    return response;
  } catch (e) {
    handleError("assignRuleToClient", e);
  }
};
