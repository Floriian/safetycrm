import { ClientForm } from "../../_components/ClientForm";

interface Props {
  params: {
    id: string;
  };
}

export default function ClientPage() {
  return <ClientForm client={undefined} />;
}
