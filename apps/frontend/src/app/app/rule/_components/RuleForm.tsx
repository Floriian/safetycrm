"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createOrEditRule,
  CreateOrEditRule,
  Rule,
  ruleSchema,
} from "./rule.schema";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { createRule, getAllRules, updateRule } from "./rule.actions";
import { Delete } from "@mui/icons-material";

interface Props {
  rule?: Rule;
}

export function RuleForm({ rule }: Props) {
  const [success, setSuccess] = useState<boolean>();

  const [rules, setRules] = useState<Rule[]>();
  const mapRulesToAutoComplete = useMemo(
    () => rules?.map((rule) => ({ label: rule.name, id: rule.id })),
    [rules]
  );

  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setError,
    control,
  } = useForm<CreateOrEditRule>({
    resolver: zodResolver(createOrEditRule),
    defaultValues: rule ?? {},
  });

  const onSubmit: SubmitHandler<CreateOrEditRule> = async (data) => {
    if (data.id) {
      const response = await updateRule(data.id, data);
      setSuccess(response?.success);
      router.refresh();
    }

    if (!data.id) {
      const response = await createRule(data);
      setSuccess(response?.success);
      router.prefetch("/app/rule");
      router.refresh();
    }
  };

  useEffect(() => {
    getAllRules()
      .then((d) => setRules(d))
      .catch(console.error);
  }, []);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "end",
              gap: "1rem",
            }}
          >
            <IconButton type="submit">
              <Delete />
            </IconButton>
            <Button type="submit" variant="contained">
              Save
            </Button>
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
            <Controller
              control={control}
              name="parentId"
              render={(props) => (
                <Autocomplete
                  options={mapRulesToAutoComplete!}
                  onChange={(e, data) => props.field.onChange(data?.id)}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </FormControl>
        </FormGroup>
      </Box>
    </Paper>
  );
}
