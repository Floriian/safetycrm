import { Box, Grid, Input, InputAdornment, Typography } from "@mui/material";
import { ClientCard } from "../../client/_components/ClientCard";
import { Search } from "@mui/icons-material";
import { Client } from "../../client/_components/client.schema";

export function OtherRulesGrid() {
  return (
    <Grid
      item
      md={4}
      sx={{
        overflow: "auto",
        maxHeight: "100%",
      }}
    >
      <Box sx={{ background: "white" }}>
        <Typography variant="h6" textAlign="center">
          Rules
        </Typography>
        <Input
          sx={{ width: "100%" }}
          placeholder="Rule name..."
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
