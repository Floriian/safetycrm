"use client";

import { FORBIDDEN_RESOURCE_ERROR, SESSION_EXPRIED_ERROR } from "@/lib/auth";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  const isSessionExpired = error.message.includes(SESSION_EXPRIED_ERROR);
  const isForbidden = error.message.includes(FORBIDDEN_RESOURCE_ERROR);

  const isAPIError = isSessionExpired || isForbidden;

  return (
    <>
      {isAPIError ? (
        <>
          {isForbidden && (
            <Dialog open={true} onClose={() => router.back()}>
              <DialogTitle>Forbidden</DialogTitle>
              <DialogActions>
                <Button onClick={() => router.back()}>Go back</Button>
              </DialogActions>
            </Dialog>
          )}

          {isSessionExpired && (
            <Dialog open={true} onClose={() => router.push("/")}>
              <DialogTitle>Session expired</DialogTitle>
              <DialogActions>
                <Button onClick={() => router.push("/")}>Log In</Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      ) : (
        <div>
          <p>{error.message}</p>
        </div>
      )}
    </>
  );
}
