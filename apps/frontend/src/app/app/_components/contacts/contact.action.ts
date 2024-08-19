"use server";

import { handleError } from "@/utils";
import { contactApi } from "./contact.api";

export const deleteContact = async (contactId: number) => {
  try {
    await contactApi.delete(contactId);
  } catch (e) {
    handleError("deleteContact", e);
  }
};
