"use client";

import { Client } from "./client.schema";
import { Card, CardContent, Typography, useTheme } from "@mui/material";

interface Props {
  client: Client;
}
export function ClientCard({ client }: Props) {
  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            transition: "ease-in",
            transitionDuration: 150,
            cursor: "pointer",
          },
          marginBottom: "1rem",
        }}
      >
        <CardContent>
          <Typography variant="h6">{client.name}</Typography>
        </CardContent>
      </Card>
    </>
  );
}
