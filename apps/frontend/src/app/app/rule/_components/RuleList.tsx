import { List, ListItemButton, ListSubheader, Tooltip } from "@mui/material";
import { Rule } from "./rule.schema";
import { RuleItem } from "./RuleItem";
import { Add } from "@mui/icons-material";
import { getAllRules } from "./rule.actions";
import { headers } from "next/headers";

export async function RuleList() {
  const rules = await getAllRules();
  const header = headers();
  const url = header.get("x-url");

  return (
    <List>
      <ListSubheader>
        <Tooltip title="Add new parent rule">
          <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
            <Add />
          </ListItemButton>
        </Tooltip>
      </ListSubheader>
      {rules?.map((rule) => (
        <RuleItem
          rule={rule}
          key={rule.id}
          active={url!.includes(rule.id!.toString())}
        />
      ))}
    </List>
  );
}
