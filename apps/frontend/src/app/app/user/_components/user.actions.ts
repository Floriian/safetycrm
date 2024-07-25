"use server";

import { cache } from "react";
import { userApi } from "./user.api";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
  try {
    return await userApi.getAll();
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
