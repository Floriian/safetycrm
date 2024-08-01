import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { User } from "../user.schema";
import { userTableCols } from "./user-table-cols";
import { UserRow } from "./UserRow";

interface Props {
  users: User[];
}

export function UsersTable({ users }: Props) {
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
