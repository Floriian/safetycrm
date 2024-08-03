"use server";

import { userApi } from "./user.api";
import { revalidatePath } from "next/cache";
import { User } from "./user.schema";
import { isAxiosError } from "axios";
import { UpdateResponse } from "@/types";
import { logError } from "@/utils";

export const getAllUsers = async () => {
  try {
    return await userApi.getAll();
  } catch (e) {
    logError(getAllUsers.name, e);
  }
};

export const getOneUser = async (id: number) => {
  try {
    return await userApi.getOne(id);
  } catch (e) {
    logError(getOneUser.name, e);
  }
};

export const deleteUser = async (id: number) => {
  try {
    await revalidatePath(`/app/user`);
    return await userApi.delete(id);
  } catch (e) {
    logError(deleteUser.name, e);
  }
};

export const updateUser = async (id: number | undefined, data: User) => {
  try {
    const response = await userApi.update(id, data);
    await revalidatePath(`/app/user/${id}`);
    return {
      success: true,
    } satisfies UpdateResponse<User>;
  } catch (e) {
    if (isAxiosError<ApiError>(e)) {
      return {
        data: e.response?.data,
        success: false,
      } satisfies UpdateResponse<ApiError>;
    }
    logError(updateUser.name, e);
  }
};

export const createUser = async (data: User) => {
  try {
    const response = await userApi.create(data);
    return response;
  } catch (e) {
    logError(createUser.name, e);
  }
};
