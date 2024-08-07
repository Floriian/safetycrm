import { Search } from "@mui/icons-material";
import { Box, Grid, Input, InputAdornment, Typography } from "@mui/material";
import { Client } from "../../client/_components/client.schema";
import { ClientCard } from "../../client/_components/ClientCard";

export function ClientsGrid() {
  return (
    <Grid
      item
      md={4}
      sx={{
        overflow: "auto",
      }}
    >
      <Box sx={{ background: "white" }}>
        <Typography variant="h6" textAlign="center">
          Clients
        </Typography>
        <Input
          sx={{ width: "100%" }}
          placeholder="Client name..."
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
        />
      </Box>
      <Box sx={{ padding: "1rem" }}>
        {Array(100)
          .fill<Client>({})
          .map((v, index) => (
            <ClientCard
              client={{
                name: "a",
                contacts: [],
                createdAt: new Date(),
                id: 1,
                updatedAt: new Date(),
                user: {},
              }}
            />
          ))}
      </Box>
    </Grid>
  );
}
