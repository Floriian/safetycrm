import { Add } from "@mui/icons-material";
import { Box, IconButton, Toolbar } from "@mui/material";

export default function RuleHeader() {
  return (
    <Toolbar sx={{ margin: "1rem" }}>
      <IconButton>
        <Add />
      </IconButton>
    </Toolbar>
  );
}
