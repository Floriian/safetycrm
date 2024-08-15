"use client";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import { RuleItem } from "./RuleItem";
import { Add, ArrowDownward } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rule } from "./rule.schema";
import { getTreeRule, getAllRules } from "./rule.actions";
import { useQuery } from "@tanstack/react-query";
import { CONSTANTS } from "@/constants";

export function RuleList() {
  const [input, setInput] = useState<string>();
  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const [sortByName, setSortByName] = useState<boolean>(false);

  const {
    data: rules,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [CONSTANTS.query.RULE],
    queryFn:
      input === undefined || input === ""
        ? () => getTreeRule()
        : () => getAllRules({ name: input }),
  });

  useEffect(() => {
    refetch();
  }, [input]);

  return (
    <List>
      <ListSubheader>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              size="small"
              label="Search rule"
              onChange={(e) => setInput(e.target.value)}
            />

            <ListItemButton onClick={() => setSortByDate(!sortByDate)}>
              <ArrowDownward />
            </ListItemButton>
          </Box>
          <Link href="/app/rule/new">
            <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
              <Add />
            </ListItemButton>
          </Link>
        </Box>
      </ListSubheader>
      {isLoading && (
        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </ListItem>
      )}
      {rules && rules?.length > 0 && (
        <>{rules?.map((rule) => <RuleItem rule={rule} key={rule.id} />)}</>
      )}
      {rules && !isLoading && rules?.length <= 0 && (
        <ListItem>
          <Typography textAlign="center">There are no rules :(</Typography>
        </ListItem>
      )}
      {error && (
        <ListItem>
          <Typography textAlign="center">An error happened.</Typography>
        </ListItem>
      )}
    </List>
  );
}
