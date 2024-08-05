import { assertAuthenticated } from "@/lib/auth";
import { ClientForm } from "../../_components/ClientForm";
import { getOneClientById } from "../../_components/client.actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function ClientPage({ params: { id } }: Props) {
  const user = await assertAuthenticated();

  const client = id === "new" ? undefined : await getOneClientById(+id);

  return <ClientForm client={client || undefined} />;
}
