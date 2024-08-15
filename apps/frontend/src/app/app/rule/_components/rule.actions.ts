"use server";

import { createUrlQuery, logError } from "@/utils";
import { ruleApi } from "./rule.api";
import { ApiError, CreateResponse, UpdateResponse } from "@/types";
import { CreateOrEditRule, Rule } from "./rule.schema";
import { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getTreeRule = async () => {
  try {
    return await ruleApi.findAllWithTreeStructure();
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
    console.log(createUrlQueryObject);
    const urlQueries = searchBy && createUrlQuery(createUrlQueryObject);
    console.log(urlQueries);
    return await ruleApi.getAll(urlQueries ? urlQueries : "");
  } catch (e) {
    logError("searchRules", e);
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
    logError("createRule", e);
  }
};

export const deleteRule = async (id: number) => {
  try {
    revalidatePath("/app/rule", "layout");
    return await ruleApi.delete(id);
  } catch (e) {
    logError("deleteRule", e);
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
    logError("updateRule", e);
  }
};
