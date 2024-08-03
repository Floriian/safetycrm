import { IconButton, TableCell, TableRow } from "@mui/material";
import { User } from "../user.schema";
import { userTableCols } from "./user-table-cols";
import type { ReactNode } from "react";
import Link from "next/link";
import { Delete, Edit } from "@mui/icons-material";
import { getCurrentUser } from "@/app/_components/auth.actions";

interface Props {
  user: User;
}

export async function UserRow({ user }: Props) {
  const userRow = userTableCols.map((col) => user[col.name]);

  const currentUser = await getCurrentUser();
  const isUserMatchesWithCurrentUser = currentUser?.user?.id === user.id;

  return (
    <TableRow>
      {userRow.map((row, i) => (
        <TableCell key={i}>{row as unknown as ReactNode}</TableCell>
      ))}
      <TableCell>
        <Link href={isUserMatchesWithCurrentUser ? {} : `/app/user/${user.id}`}>
          <IconButton disabled={isUserMatchesWithCurrentUser}>
            <Delete
              color={isUserMatchesWithCurrentUser ? "disabled" : "error"}
            />
          </IconButton>
        </Link>
        <Link href={`/app/user/${user.id}/details`}>
          <IconButton>
            <Edit color="primary" />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
}
