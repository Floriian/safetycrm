import { getOneRuleById } from "../_components/rule.actions";
import { RuleForm } from "../_components/RuleForm";

interface Props {
  params: {
    id: string;
  };
}
export default async function RulePage({ params: { id } }: Props) {
  const rule = id !== "new" ? await getOneRuleById(+id) : undefined;
  console.log("rule", rule);
  return <RuleForm rule={rule} />;
}
