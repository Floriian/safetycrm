import React from "react";
import { getCurrentUser } from "../_components/auth.actions";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { CONSTANTS } from "@/constants";
import { redirect } from "next/navigation";
import { Drawer } from "./_components";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentUser = await getCurrentUser();
  if (currentUser?.status === HttpStatusCode.Unauthorized) {
    cookies().delete(CONSTANTS.cookies.AUTH_COOKIE);
    redirect("/");
  }
  return <Drawer>{children}</Drawer>;
}
