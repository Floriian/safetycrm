import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

export default function RuleHeader() {
  return (
    <Box sx={{ margin: "1rem" }}>
      <IconButton>
        <Add />
      </IconButton>
    </Box>
  );
}
