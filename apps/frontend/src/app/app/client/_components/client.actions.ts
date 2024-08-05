"use server";

import { clientApi } from "./client.api";
import { Client } from "./client.schema";
import { isAxiosError } from "axios";
import { logError } from "@/utils";
import { CreateResponse } from "@/types";

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
