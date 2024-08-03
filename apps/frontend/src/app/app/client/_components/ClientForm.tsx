"use client";

import { useState } from "react";
import { Client, clientSchema } from "./client.schema";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  FormGroup,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { ContactForm } from "../../_components";

interface Props {
  client?: Client;
}

export function ClientForm({ client }: Props) {
  const [success, setSuccess] = useState<boolean>();

  const router = useRouter();

  const methods = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: client ?? {},
  });

  const onSubmit: SubmitHandler<Client> = async (data) => console.log(data);

  return (
    <Paper sx={{ padding: "1rem " }}>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {success && (
              <Alert onClose={() => setSuccess(!success)}>
                Client updated successfully.
              </Alert>
            )}
            <TextField
              label="Name"
              error={!!methods.formState.errors.name?.message}
              helperText={methods.formState.errors.name?.message}
              {...methods.register("name")}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
            <ContactForm />
          </FormGroup>
        </Box>
      </FormProvider>
    </Paper>
  );
}
