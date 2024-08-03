import type { TableCols } from "@/types";
import { Client } from "../client.schema";
export const clientTableCols: TableCols<Client> = [
  { headerName: "Name", name: "name" },
  { headerName: "Username", name: "user" },
];
