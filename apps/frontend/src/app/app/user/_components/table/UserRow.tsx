import { TableCell, TableRow } from "@mui/material";
import { User } from "../user.schema";
import { userTableCols } from "./user-table-cols";
import type { ReactNode } from "react";
import { UserTableRowActions } from "./UserTableRowActions";

interface Props {
  user: User;
}

export function UserRow({ user }: Props) {
  const userRow = userTableCols.map((col) => user[col.name]);
  return (
    <TableRow>
      {userRow.map((row, i) => (
        <TableCell key={i}>{row as unknown as ReactNode}</TableCell>
      ))}
      <UserTableRowActions userId={user.id} />
    </TableRow>
  );
}
