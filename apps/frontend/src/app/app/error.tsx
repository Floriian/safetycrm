"use client";

import { SESSION_EXPRIED_ERROR } from "@/lib/auth";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  const isSessionExpired = error.message.includes(SESSION_EXPRIED_ERROR);

  return (
    <div>
      {isSessionExpired ? (
        <Dialog open={true} onClose={() => router.push("/")}>
          <DialogTitle>Session expired</DialogTitle>
          <DialogActions>
            <Button onClick={() => router.push("/")}>Log In</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <>
          <p className="text-lg">{error.message}</p>
        </>
      )}
    </div>
  );
}
