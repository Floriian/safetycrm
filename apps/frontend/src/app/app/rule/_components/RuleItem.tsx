"use client";

import { useRouter } from "next/navigation";
import { Rule } from "./rule.schema";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Folder, FolderOpen } from "@mui/icons-material";

interface Props {
  rule: Rule;
  active?: boolean;
}

// TODO: use Link component!
export function RuleItem({ rule, active }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (rule.children && rule.children.length > 0) {
      console.log({ rule });
    } else {
      console.log("no");
    }
  }, [rule]);

  const handleClick = (event: React.MouseEvent, ruleId: number) => {
    event.stopPropagation();
    router.push(`/app/rule/${rule.id}`);
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end">
            <Delete />
          </IconButton>
        }
      >
        <ListItemButton
          onClick={(e: React.MouseEvent) => handleClick(e, rule!.id!)}
          selected={active}
        >
          {rule.children && rule?.children?.length > 0 && (
            <ListItemIcon>{open ? <FolderOpen /> : <Folder />}</ListItemIcon>
          )}
          <ListItemText primary={<Typography>{rule.name}</Typography>} />
        </ListItemButton>
      </ListItem>
      {rule.children && rule.children.length > 0 && (
        <Collapse in={open} unmountOnExit>
          <List component="div" sx={{ paddingLeft: "1rem" }}>
            {rule.children.map((childRule) => (
              <RuleItem rule={childRule} key={childRule.id} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
