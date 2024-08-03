import { Add } from "@mui/icons-material";
import { IconButton, Paper, Tooltip } from "@mui/material";
import Link from "next/link";

export function ClientPageHeader() {
  return (
    <Paper
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Link href="/app/client/new/details">
        <Tooltip title="Create new client">
          <IconButton>
            <Add />
          </IconButton>
        </Tooltip>
      </Link>
    </Paper>
  );
}
