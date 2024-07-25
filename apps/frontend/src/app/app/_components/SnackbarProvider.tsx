"use client";

import { SnackbarProvider as NotistackProvider } from "notistack";

interface Props {
  children: React.ReactNode;
}

export function SnackBarProvider({ children }: Props) {
  return <NotistackProvider>{children}</NotistackProvider>;
}
