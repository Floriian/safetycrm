"use client";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { RuleItem } from "./RuleItem";
import { Add, ArrowDownward, ArrowUpward } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rule } from "./rule.schema";
import { getTreeRule, getAllRules } from "./rule.actions";
import { useQuery } from "@tanstack/react-query";
import { CONSTANTS } from "@/constants";

export function RuleList() {
  const [input, setInput] = useState<string>();
  const [orderBy, setOrderBy] = useState<
    {
      field: keyof Rule;
      isASC: boolean;
    }[]
  >([
    { field: "name", isASC: false },
    { field: "createdAt", isASC: false },
  ]);

  const orderByFields = orderBy
    .map((o) => (o.isASC ? o.field : undefined))
    .filter((o): o is keyof Rule => o !== undefined);

  const {
    data: rules,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [CONSTANTS.query.RULES],
    queryFn:
      input === undefined || input === ""
        ? () => getTreeRule()
        : () =>
            getAllRules({
              name: input,
              orderFields: orderByFields,
            }),
  });

  const handleOrderBy = (fieldName: keyof Rule) => {
    setOrderBy((prev) => {
      const existingField = prev!.find((value) => value.field === fieldName);

      if (existingField) {
        return prev!.map((value) =>
          value.field === fieldName ? { ...value, isASC: !value.isASC } : value
        );
      } else {
        return [...prev!, { field: fieldName, isASC: true }];
      }
    });
  };

  useEffect(() => {
    refetch();
  }, [input, orderByFields]);

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

            {orderBy.map((item) => (
              <Tooltip title={`Order by ${item.field}`} key={item.field}>
                <ListItemButton onClick={() => handleOrderBy(item.field)}>
                  {item.isASC ? <ArrowDownward /> : <ArrowUpward />}
                </ListItemButton>
              </Tooltip>
            ))}
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
