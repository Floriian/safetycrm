"use server";

import { cache } from "react";
import { userApi } from "./user.api";

export const getAllUsers = async () => {
  try {
    return await userApi.getAll();
  } catch (e) {
    console.log(e);
  }
};
