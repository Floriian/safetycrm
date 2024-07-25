"use client";
import { Dialog } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function UserDeleteModal({ params: { id } }: Props) {
  const router = useRouter();
  return (
    <Dialog open={true} onClose={() => router.back()}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, illum
      atque? Ratione reprehenderit quis ducimus nostrum itaque? Rem, numquam!
      Corrupti labore dolore dolor suscipit nihil voluptatibus officiis,
      quisquam nostrum ipsum.
    </Dialog>
  );
}
