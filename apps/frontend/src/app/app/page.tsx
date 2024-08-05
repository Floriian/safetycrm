import { Button } from "@mui/material";
import {
  assertAuthenticated,
  getCurrentUser,
} from "../_components/auth.actions";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await assertAuthenticated();
  return <Button>Get me</Button>;
}
