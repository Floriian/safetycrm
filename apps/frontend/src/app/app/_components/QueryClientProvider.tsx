"use client";
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClient,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}
export default function QueryClientProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <TanstackQueryClient client={queryClient}>{children}</TanstackQueryClient>
  );
}
