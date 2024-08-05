import { Box } from "@mui/material";
import { ClientsTable } from "./_components/table/ClientsTable";
import { ClientPageHeader } from "./_components/ClientPageHeader";
import { assertAuthenticated } from "@/lib/auth";

export default async function ClientPage() {
  const user = await assertAuthenticated();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <ClientPageHeader />
      <ClientsTable clients={undefined} />
    </Box>
  );
}
