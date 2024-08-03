import type { TableCols } from "@/types";
import { User } from "../user.schema";

export const userTableCols: TableCols<User> = [
  { headerName: "ID", name: "id" },
  { headerName: "Name", name: "name" },
  { headerName: "Email", name: "email" },
];
