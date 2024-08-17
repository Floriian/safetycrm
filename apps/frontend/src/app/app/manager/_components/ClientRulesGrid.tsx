import { GridItem } from "@/components";
import {
  Input,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { getAppliedClientRules } from "../../rule/_components/rule.actions";
import { ClientRulesList } from "./ClientRulesList";
import { useQuery } from "@tanstack/react-query";
import { CONSTANTS } from "@/constants";

interface Props {
  clientId: number;
}

export async function ClientRulesGrid({ clientId }: Props) {
  const clientRules = await getAppliedClientRules(clientId);
  return (
    <GridItem>
      <Typography variant="h6" textAlign="center">
        Applied rules
      </Typography>
      <ClientRulesList clientRules={clientRules!} />
    </GridItem>
  );
}
