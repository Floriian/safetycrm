"use client";

import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Contact } from "./contact.schema";
import { deleteContact } from "./contact.action";

type Contacts = { contacts: Contact[] };

export function ContactForm() {
  const { control, register, getValues } = useFormContext<Contacts>();
  const { fields, append, insert, remove } = useFieldArray<Contacts>({
    control,
    name: "contacts" as const,
  });

  const addContact = () => append({ phoneNumber: "" });
  const removeField = (index: number) => {
    const fieldValues = getValues(`contacts.${index}`);
    try {
      const result = deleteContact(fieldValues!.id!);
      remove(index);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box>
      <Typography variant="h4">Contacts</Typography>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {fields.map((field, i) => (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
            }}
            key={i}
          >
            <TextField
              label="Phone number"
              {...register(`contacts.${i}.phoneNumber`)}
            />
            <IconButton
              onClick={(e) => {
                removeField(i);
              }}
            >
              <Remove />
            </IconButton>
          </Box>
        ))}
      </FormGroup>
      <Button onClick={addContact}>
        Add contact <Add />
      </Button>
    </Box>
  );
}
