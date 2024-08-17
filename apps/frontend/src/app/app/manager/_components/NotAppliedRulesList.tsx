"use client";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { Rule } from "../../rule/_components/rule.schema";
import { SearchInput } from "@/components";
import { KeyboardBackspace } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { assignRuleToClient } from "../../rule/_components/rule.actions";

interface Props {
  rules: Rule[];
}
export function NotAppliedRulesList({ rules }: Props) {
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
          <SearchInput label="Search" />
        </Toolbar>
      </ListSubheader>
      {rules.map((rule) => (
        <ListItem key={rule.id}>
          <ListItemButton
            onClick={() => assignRuleToClient(rule!.id!, +params.clientId)}
          >
            <ListItemText primary={<Typography>{rule.name}</Typography>} />
            <IconButton disabled>
              <KeyboardBackspace />
            </IconButton>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
