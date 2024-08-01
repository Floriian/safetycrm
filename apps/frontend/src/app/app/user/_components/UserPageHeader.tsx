import { Add } from "@mui/icons-material";
import { IconButton, Paper, Tooltip } from "@mui/material";
import Link from "next/link";

export function UserPageHeader() {
  return (
    <Paper
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Link href="/app/user/new/details">
        <Tooltip title="Create new user">
          <IconButton>
            <Add />
          </IconButton>
        </Tooltip>
      </Link>
    </Paper>
  );
}
