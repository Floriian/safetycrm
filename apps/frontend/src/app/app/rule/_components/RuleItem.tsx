"use client";

import { useRouter } from "next/navigation";
import { Rule } from "./rule.schema";
import { ListItem, ListItemButton, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";

interface Props {
  rule: Rule;
  active: boolean;
}

//TODO: use link component!
export function RuleItem({ rule, active }: Props) {
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => console.log(active), [active]);

  return (
    <ListItemButton
      onClick={() => router.push(`/app/rule/${rule.id}`)}
      selected={active}
    >
      <Typography>{rule.name}</Typography>
    </ListItemButton>
  );
}
