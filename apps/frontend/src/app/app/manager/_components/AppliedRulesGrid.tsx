import { Box, Grid, Input, InputAdornment, Typography } from "@mui/material";
import { Client } from "../../client/_components/client.schema";
import { ClientCard } from "../../client/_components/ClientCard";
import { Search } from "@mui/icons-material";
import { Droppable } from "react-beautiful-dnd";
import { getOneClientById } from "../../client/_components/client.actions";

export async function AppliedRulesGrid() {
  const client = await getOneClientById(1);
  return (
    <Grid
      item
      md={4}
      sx={{
        backgroundColor: "rgba(0,0,0,0.1)",
        overflow: "auto",
        maxHeight: "100%",
      }}
    >
      <Box sx={{ background: "white" }}>
        <Typography variant="h6" textAlign="center">
          Applied rules
        </Typography>
        <Input
          sx={{ width: "100%" }}
          placeholder="Applied rule name..."
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
        />
      </Box>
      <Droppable droppableId="applied-rules">
        <div>
          <ClientCard client={client} />
        </div>
      </Droppable>
    </Grid>
  );
}
