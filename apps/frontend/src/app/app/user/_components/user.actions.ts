"use server";

import { cache } from "react";
import { userApi } from "./user.api";
import { revalidatePath } from "next/cache";
import { User } from "./user.schema";

export const getAllUsers = async () => {
  try {
    return await userApi.getAll();
  } catch (e) {
    console.log(e);
  }
};

export const getOneUser = async (id: number) => {
  try {
    return await userApi.getOne(id);
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (id: number) => {
  try {
    await revalidatePath(`/app/user`);
    return await userApi.delete(id);
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (id: number, data: User) => {
  try {
    const response = await userApi.update(id, data);
    await revalidatePath(`/app/user/${id}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async (data: User) => {
  try {
    const response = await userApi.create(data);
    return response;
  } catch (e) {
    console.log(e);
  }
};
