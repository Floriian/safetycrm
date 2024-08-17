import { ClientRulesGrid } from "../_components/ClientRulesGrid";
import { RulesGrid } from "../_components/RulesGrid";

export default async function ClientManagerPage({
  params: { clientId },
}: {
  params: { clientId: string };
}) {
  return (
    <>
      <ClientRulesGrid clientId={+clientId} />
      <RulesGrid clientId={+clientId} />
    </>
  );
}
