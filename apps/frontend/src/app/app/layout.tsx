import React from "react";
import { Drawer, SnackBarProvider } from "./_components";
import { getCurrentUser } from "../_components/auth.actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CONSTANTS } from "@/constants";

export const revalidate = 10;

export default async function AppLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const user = await getCurrentUser();
  if (user?.sessionExpired) {
    console.log(user);
    redirect("/");
  }
  return (
    <SnackBarProvider>
      <Drawer>
        {modal}
        {children}
      </Drawer>
    </SnackBarProvider>
  );
}
