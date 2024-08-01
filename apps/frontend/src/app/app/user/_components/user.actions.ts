"use server";

import { userApi } from "./user.api";
import { revalidatePath } from "next/cache";
import { User } from "./user.schema";
import { isAxiosError } from "axios";
import { UpdateResponse } from "@/types";

export const getAllUsers = async () => {
  try {
    return await userApi.getAll();
  } catch (e) {
    console.error(e);
  }
};

export const getOneUser = async (id: number) => {
  try {
    return await userApi.getOne(id);
  } catch (e) {
    console.error(e);
  }
};

export const deleteUser = async (id: number) => {
  try {
    await revalidatePath(`/app/user`);
    return await userApi.delete(id);
  } catch (e) {
    console.error(e);
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
    console.error(e);
  }
};

export const createUser = async (data: User) => {
  try {
    const response = await userApi.create(data);
    return response;
  } catch (e) {
    console.error(e);
  }
};
