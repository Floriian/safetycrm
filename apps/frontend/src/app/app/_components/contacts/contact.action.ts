"use server";

import { logError } from "@/utils";
import { contactApi } from "./contact.api";

export const deleteContact = async (contactId: number) => {
  try {
    await contactApi.delete(contactId);
  } catch (e) {
    logError("deleteContact", e);
  }
};
