import { Box } from "@mui/material";
import { UsersTable } from "./_components/table/UsersTable";
import { getAllUsers } from "./_components/user.actions";
import { UserPageHeader } from "./_components/UserPageHeader";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <UserPageHeader />
      <UsersTable users={users!} />
    </Box>
  );
}
