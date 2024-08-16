import { Box, Grid } from "@mui/material";
import React from "react";
import RuleHeader from "./_components/RuleHeader";
import { ClientsList } from "../client/_components/ClientsList";

export default function ManagerLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <Grid container>
      <ClientsList />
      {children}
    </Grid>
  );
}
