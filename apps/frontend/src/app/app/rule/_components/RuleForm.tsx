"use client";

import { useEffect, useState } from "react";
import { Rule, ruleSchema } from "./rule.schema";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { getAllRules } from "./rule.actions";

interface Props {
  rule?: Rule;
}

export function RuleForm({ rule }: Props) {
  const [success, setSuccess] = useState<boolean>();

  const [rules, setRules] = useState<Rule[]>();

  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<Rule>({
    resolver: zodResolver(ruleSchema),
    defaultValues: rule ?? {},
  });

  const onSubmit: SubmitHandler<Rule> = async (data) => {
    console.log(data);
    if (data.id) await console.log("updating rule");
    if (!data.id) await console.log("creating rule");
  };

  useEffect(() => {
    getAllRules().then((data) => setRules(data));
  }, []);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
            <Button type="submit">Save</Button>
          </Box>
          {success && (
            <Alert onClose={() => setSuccess(!success)}>
              Rule {rule?.id ? "updated" : "created"} successfully.
            </Alert>
          )}
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name?.message}
          />
          <TextField
            label="Description"
            multiline
            rows="4"
            {...register("description")}
          />
          <FormControl fullWidth>
            <InputLabel id="parent-rule">Parent rule</InputLabel>
            <Select labelId="parent-rule" id="select-parent">
              {rules?.map((rule) => (
                <MenuItem key={rule.id} value={rule.id}>
                  {rule.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGroup>
      </Box>
    </Paper>
  );
}
