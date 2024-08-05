import React from "react";
import { Drawer } from "./_components";

export const revalidate = 10;

export default async function AppLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <Drawer>
      {modal}
      {children}
    </Drawer>
  );
}
