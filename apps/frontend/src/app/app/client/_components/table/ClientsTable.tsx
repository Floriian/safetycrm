import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { Client } from "../client.schema";
import { clientTableCols } from "./client-table-cols";
import { ClientRow } from "./ClientRow";

interface Props {
  clients: Client[] | undefined;
}

export function ClientsTable({ clients }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          {clientTableCols.map((col) => (
            <TableCell key={col.name}>{col.headerName}</TableCell>
          ))}
          <TableCell>Actions</TableCell>
        </TableHead>
        <TableBody>
          {clients?.length && clients.length <= 0 && (
            <Typography align="center" variant="h3">
              There are no clients :()
            </Typography>
          )}
          {clients?.map((client) => (
            <ClientRow client={client} key={client.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
