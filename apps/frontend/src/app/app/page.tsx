import { assertAuthenticated } from "@/lib/auth";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await assertAuthenticated();
  return <Button>Get me</Button>;
}
