import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getAllUsers } from "./_components/user.actions";
import { User } from "./_components/user.schema";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { getCurrentUser } from "@/app/_components/auth.actions";
import { Delete, Edit } from "@mui/icons-material";
import { userTableCols } from "./_components/table";
import { UserRow } from "./_components/table/UserRow";

export default async function UsersPage() {
  const users = await getAllUsers();
  const currentUser = await getCurrentUser();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {userTableCols.map((col) => (
              <TableCell key={col.name}>{col.headerName}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.length && users.length <= 0 && (
            <Typography align="center" variant="h3">
              There are no users :(
            </Typography>
          )}
          {users?.map((user) => <UserRow user={user} key={user.id} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
