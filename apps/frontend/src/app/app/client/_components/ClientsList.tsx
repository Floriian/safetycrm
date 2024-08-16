"use client";
import { Search } from "@mui/icons-material";
import {
  Box,
  Grid,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CONSTANTS } from "@/constants";
import { getAllClients } from "../../client/_components/client.actions";
import { useRouter } from "next/navigation";

export function ClientsList() {
  const { data } = useQuery({
    queryKey: [CONSTANTS.query.CLIENTS],
    queryFn: () => getAllClients(),
  });
  const router = useRouter();
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
        <List>
          {data?.map((client) => (
            <ListItem key={client.id}>
              <ListItemButton
                onClick={() => router.push(`/app/manager/${client.id}`)}
              >
                <ListItemText>{client.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Grid>
  );
}
