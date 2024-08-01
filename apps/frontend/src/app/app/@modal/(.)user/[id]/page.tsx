"use client";
import { deleteUser } from "@/app/app/user/_components/user.actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

interface Props {
  params: {
    id: string;
  };
}

export default function UserDeleteModal({ params: { id } }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      await deleteUser(+id);

      enqueueSnackbar("User deleted successfully.", { variant: "success" });

      router.back();
    } catch (e) {
      enqueueSnackbar("An error happened.", { variant: "error" });
      console.error(e);
    }
  };

  return (
    <Dialog open={true} onClose={() => router.back()}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>Are you sure to delete this user?</DialogContent>
      <DialogActions>
        <Button onClick={() => router.back()}>Cancel</Button>
        <Button onClick={handleClick} variant="outlined">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
