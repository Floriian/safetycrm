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

export function ContactForm() {
  const { control, register, getValues } = useFormContext<Contact>();
  const { fields, append, insert, remove } = useFieldArray<Contact>({
    control,
    //@ts-expect-error we need a better workaround for this.
    name: "contact",
  });

  const addContact = () => append({ contactPhoneNumber: "" });
  const removeField = (index: number) => remove(index);

  useEffect(() => console.log(fields), [fields]);

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
              //@ts-expect-error we need a better workaround for this...
              {...register(`contact.${i}.contactPhoneNumber`)}
            />
            <IconButton onClick={() => removeField(i)}>
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
