"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthSchema, authSchema } from "./auth.schema";
import { loginAction } from "./auth.actions";

export function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    const res = await loginAction(data);
    console.log(res);
  };

  return (
    <Paper
      sx={{
        padding: "1rem",
        width: "20rem",
      }}
    >
      <Typography variant="h6" textAlign="center" sx={{ marginBottom: "1rem" }}>
        Safety CRM
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            label="Email"
            error={!!errors.email?.message}
            helperText={errors.email?.message ? errors.email.message : ""}
            {...register("email")}
          />
          <TextField
            label="Password"
            type="password"
            error={!!errors.password?.message}
            helperText={errors.password?.message ? errors.password.message : ""}
            {...register("password")}
          />
          <Button variant="contained" type="submit">
            Log In
          </Button>
        </FormGroup>
      </Box>
    </Paper>
  );
}