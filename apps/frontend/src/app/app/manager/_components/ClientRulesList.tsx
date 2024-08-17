"use client";

import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Rule } from "../../rule/_components/rule.schema";
import { useState } from "react";
import { ArrowRight, ArrowRightAlt, Search } from "@mui/icons-material";
import { SearchInput } from "@/components";
import { deassignRuleToClient } from "../../rule/_components/rule.actions";
import { useParams } from "next/navigation";

interface Props {
  clientRules: Rule[];
}
export function ClientRulesList({ clientRules }: Props) {
  const params = useParams<{ clientId: string }>();
  return (
    <List>
      <ListSubheader>
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SearchInput />
        </Toolbar>
      </ListSubheader>
      {clientRules?.map((rule) => (
        <ListItem key={rule.id}>
          <ListItemButton
            onClick={() => deassignRuleToClient(rule.id!, +params.clientId)}
          >
            <ListItemText primary={<Typography>{rule.name}</Typography>} />
            <IconButton disabled>
              <ArrowRightAlt />
            </IconButton>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
