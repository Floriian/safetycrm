import { Grid, List, ListItem, Paper } from "@mui/material";
import { RuleList } from "./_components/RuleList";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "default-no-store";

export default async function RuleLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <Grid container spacing={0}>
      <Grid
        item
        md={5}
        sx={{
          borderRight: "2px solid rgba(0,0,0,0.5)",
          width: "min-content",
          padding: "1rem",
        }}
      >
        <Paper sx={{ maxHeight: "calc(100vh - 10rem)", overflow: "auto" }}>
          <RuleList />
        </Paper>
      </Grid>
      <Grid item md={7} sx={{ padding: "1rem" }}>
        {children}
      </Grid>
    </Grid>
  );
}
