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
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CONSTANTS } from "@/constants";
import { getAllClients } from "../../client/_components/client.actions";
import { useRouter } from "next/navigation";
import { GridItem, SearchInput } from "@/components";

export function ClientsList() {
  const { data } = useQuery({
    queryKey: [CONSTANTS.query.CLIENTS],
    queryFn: () => getAllClients(),
  });
  const router = useRouter();
  return (
    <GridItem>
      <Typography variant="h6" textAlign="center">
        Clients
      </Typography>
      <List>
        <ListSubheader>
          <Toolbar sx={{ background: "white" }}>
            <SearchInput />
          </Toolbar>
        </ListSubheader>
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
    </GridItem>
  );
}
