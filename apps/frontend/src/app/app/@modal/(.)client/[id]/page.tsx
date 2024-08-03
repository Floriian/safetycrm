"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

interface Props {
  params: {
    id: string;
  };
}

export default function DeleteClientModal({ params: { id } }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      console.log("delete client");

      enqueueSnackbar("Client deleted successfully.", { variant: "success" });

      router.back();
    } catch (e) {
      enqueueSnackbar("An error happened.", { variant: "error" });
      console.error(e);
    }
  };

  return (
    <Dialog open={true} onClose={() => router.back()}>
      <DialogTitle>Delete Client</DialogTitle>
      <DialogContent>Are you sure to delete this client?</DialogContent>
      <DialogActions>
        <Button onClick={() => router.back()}>Cancel</Button>
        <Button onClick={handleClick} variant="outlined">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
