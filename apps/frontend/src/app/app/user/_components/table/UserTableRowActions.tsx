"use client";

import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  userId: number | undefined;
}

export function UserTableRowActions({ userId }: Props) {
  const router = useRouter();

  return (
    <>
      <TableCell>
        <Link href={`/app/user/${userId}/delete`}>
          <IconButton>
            <Delete color="error" />
          </IconButton>
        </Link>
        <Link href={`/app/user/${userId}`}>
          <IconButton>
            <Edit color="primary" />
          </IconButton>
        </Link>
      </TableCell>
    </>
  );
}
