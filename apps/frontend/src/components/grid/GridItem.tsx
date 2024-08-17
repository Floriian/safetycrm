import { Grid, GridProps } from "@mui/material";

export function GridItem(props: GridProps) {
  return <Grid {...props} item md={4} />;
}
