"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  ruleId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleOnDeleteClick: () => void;
}

export function DeleteRuleModal({
  ruleId,
  open,
  setOpen,
  handleOnDeleteClick,
}: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(!open)}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete this rule? It deletes all the children{"'"}s
          rules.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button>Cancel</Button>
        <Button onClick={handleOnDeleteClick}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
