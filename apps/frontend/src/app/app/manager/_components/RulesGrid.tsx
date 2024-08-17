import { GridItem } from "@/components";
import { RuleList } from "../../rule/_components/RuleList";
import { Typography } from "@mui/material";
import { getNotAppliedClientRules } from "../../rule/_components/rule.actions";
import { NotAppliedRulesList } from "./NotAppliedRulesList";

interface Props {
  clientId: number;
}

export async function RulesGrid({ clientId }: Props) {
  const notAppliedRules = await getNotAppliedClientRules(clientId);
  return (
    <GridItem>
      <Typography variant="h6" textAlign="center">
        Not applied rule
      </Typography>
      <NotAppliedRulesList rules={notAppliedRules!} />
    </GridItem>
  );
}
