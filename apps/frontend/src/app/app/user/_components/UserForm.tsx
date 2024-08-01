"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import {
  CreateOrUpdateUserSchema,
  createOrUpdateUserSchema,
  type User,
  userSchema,
} from "./user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormGroup, Paper, TextField } from "@mui/material";
import { useEffect } from "react";
import { createUser, updateUser } from "./user.actions";
import { useRouter } from "next/navigation";

interface Props {
  user?: User;
}

export function UserForm({ user }: Props) {
  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CreateOrUpdateUserSchema>({
    resolver: zodResolver(createOrUpdateUserSchema),
    defaultValues: user?.id ? { ...user, isNew: false } : { isNew: true },
  });

  const onSubmit: SubmitHandler<CreateOrUpdateUserSchema> = async (data) => {
    console.log(data.isNew);
    if (!data.isNew) {
      //@ts-ignore
      await updateUser(data.id, data);
    }
    if (data.isNew) {
      const response = await createUser(data);
      router.push(`/app/user/${response?.id}/details`);
    }
  };

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Name"
            error={!!errors.name?.message}
            helperText={!!errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Email"
            error={!!errors.email?.message}
            helperText={!!errors.email?.message}
            {...register("email")}
          />
          <TextField
            label="Password"
            error={!!errors.password?.message}
            helperText={!!errors.password?.message}
            type="password"
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
