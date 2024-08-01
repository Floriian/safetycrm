"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import {
  CreateOrUpdateUserSchema,
  createOrUpdateUserSchema,
  type User,
  userSchema,
} from "./user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, FormGroup, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { createUser, updateUser } from "./user.actions";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { CONSTANTS } from "@/constants";

interface Props {
  user?: User;
}

export function UserForm({ user }: Props) {
  const [success, setSuccess] = useState<boolean>();

  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<CreateOrUpdateUserSchema>({
    resolver: zodResolver(createOrUpdateUserSchema),
    defaultValues: user?.id ? { ...user, isNew: false } : { isNew: true },
  });

  const onSubmit: SubmitHandler<CreateOrUpdateUserSchema> = async (data) => {
    if (!data.isNew) {
      const res = await updateUser(data?.id, data);

      if (!res?.success) {
        if (res?.data?.message === CONSTANTS.api.EMAIL_ALREADY_IN_USE)
          setError("email", { message: CONSTANTS.api.EMAIL_ALREADY_IN_USE });
      }

      setSuccess(res?.success);
    }
    if (data.isNew) {
      const response = await createUser(data);
      router.push(`/app/user/${response?.id}/details`);
    }
  };

  useEffect(() => console.log(errors), [errors]);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {success && (
            <Alert onClose={() => setSuccess(!success)}>
              User updated successfully.
            </Alert>
          )}
          <TextField
            label="Name"
            error={!!errors.name?.message}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Email"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            autoComplete="false"
            {...register("email")}
          />
          <TextField
            label="Password"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            type="password"
            autoComplete="new-password"
            {...register("password")}
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </FormGroup>
      </Box>
    </Paper>
  );
}
