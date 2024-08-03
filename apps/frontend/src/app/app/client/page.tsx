import { Box } from "@mui/material";
import { ClientsTable } from "./_components/table/ClientsTable";
import { ClientPageHeader } from "./_components/ClientPageHeader";

export default function ClientPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <ClientPageHeader />
      <ClientsTable clients={undefined} />
    </Box>
  );
}
