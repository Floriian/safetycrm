import { getOneClientById } from "../../client/_components/client.actions";
import { Rule } from "../../rule/_components/rule.schema";

const fakeClientRules: Rule[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "AAA",
    id: 1,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "BBB",
    id: 2,
  },
];

const fakeAllRules: Rule[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "FAKE1",
    id: 1,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "FAKE2",
    id: 2,
  },
];

export default async function ClientManagerPage({
  params: { clientId },
}: {
  params: { clientId: string };
}) {
  const client = await getOneClientById(+clientId);
  return <>dnd</>;
}
