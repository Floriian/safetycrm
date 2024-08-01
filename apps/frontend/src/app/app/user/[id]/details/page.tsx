import { HttpStatusCode } from "axios";
import { getOneUser } from "../../_components/user.actions";
import { UserForm } from "../../_components/UserForm";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}
export default async function UserPage({ params: { id } }: Props) {
  const user = await getOneUser(+id);
  if (user?.status === HttpStatusCode.NotFound) await redirect("/app/user");

  return <UserForm user={user?.data || undefined} />;
}
