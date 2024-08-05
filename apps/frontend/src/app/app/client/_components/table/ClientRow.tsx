import { IconButton, TableCell, TableRow } from "@mui/material";
import { Client } from "../client.schema";
import { clientTableCols } from "./client-table-cols";
import { ReactNode } from "react";
import Link from "next/link";
import { Delete, Edit } from "@mui/icons-material";

interface Props {
  client: Client;
}

export async function ClientRow({ client }: Props) {
  const clientRow = clientTableCols.map((col) => client[col.name]);

  return (
    <TableRow>
      {clientRow.map((row, i) => (
        <TableCell key={i}>{row as unknown as ReactNode}</TableCell>
      ))}
      <TableCell>
        <Link href={`/app/client/${client.id}`}>
          <IconButton>
            <Delete color="error" />
          </IconButton>
        </Link>
        <Link href={`/app/client/${client.id}/details`}>
          <IconButton>
            <Edit color="primary" />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
}
