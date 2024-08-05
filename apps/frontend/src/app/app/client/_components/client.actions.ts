"use server";

import { clientApi } from "./client.api";
import { Client } from "./client.schema";
import { isAxiosError } from "axios";
import { logError } from "@/utils";
import { ApiError, CreateResponse, UpdateResponse } from "@/types";
import { revalidatePath } from "next/cache";

export const createClient = async (client: Client) => {
  try {
    const { data } = await clientApi.create(client);
    return { success: true, data } satisfies CreateResponse<Client>;
  } catch (e) {
    if (isAxiosError<ApiError>(e)) {
      return {
        success: false,
        data: e.response?.data,
      } satisfies CreateResponse<ApiError>;
    }
    logError("createClient", e);
  }
};

export const getAllClients = async () => {
  try {
    return await clientApi.getAll();
  } catch (e) {
    logError("getAllClients", e);
  }
};

export const getOneClientById = async (id: number) => {
  try {
    await revalidatePath("/app/clients");
    return await clientApi.getOneById(id);
  } catch (e) {
    logError("getOneClientById", e);
  }
};

export const updateClient = async (id: number, data: Client) => {
  try {
    const response = await await clientApi.updateById(id, data);
    await revalidatePath(`/app/client/${id}`);
    return { success: true } satisfies UpdateResponse<Client>;
  } catch (e) {
    if (isAxiosError<ApiError>(e)) {
      return {
        data: e.response?.data,
        success: false,
      } satisfies UpdateResponse<ApiError>;
    }
    logError("updateClient", e);
  }
};
