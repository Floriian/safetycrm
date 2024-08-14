import { getCurrentUser } from "@/app/_components";
import { SesionExpiredError } from "./auth-error";
export const assertAuthenticated = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser?.sessionExpired && !currentUser.user) {
    throw new SesionExpiredError();
  }

  return currentUser?.user;
};
