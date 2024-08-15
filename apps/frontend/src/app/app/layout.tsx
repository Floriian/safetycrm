import React from "react";
import { Drawer } from "./_components";
import QueryClientProvider from "./_components/QueryClientProvider";

export const revalidate = 10;

export default async function AppLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <QueryClientProvider>
      <Drawer>
        {modal}
        {children}
      </Drawer>
    </QueryClientProvider>
  );
}
