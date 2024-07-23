import { Box, Paper } from "@mui/material";
import { LoginForm } from "./_components";

export default function Landing() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 5rem)",
      }}
    >
      <LoginForm />
    </Box>
  );
}
