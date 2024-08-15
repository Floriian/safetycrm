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
import { Delete, Remove } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CONSTANTS } from "@/constants";

interface Props {
  rule?: Rule;
}

export function RuleForm({ rule }: Props) {
  const [success, setSuccess] = useState<boolean>();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: rules } = useQuery({
    queryKey: [CONSTANTS.query.RULE_AUTOCOMPLETE_LIST],
    queryFn: () => getAllRules(),
  });

  const mapRulesToAutoComplete = useMemo(
    () =>
      rules !== undefined &&
      rules.map((rule) => ({ label: rule.name, id: rule.id })),
    [rules]
  );

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    control,
  } = useForm<CreateOrEditRule>({
    resolver: zodResolver(createOrEditRule),
    defaultValues:
      {
        ...rule,
        parentId: rule?.parent?.id ?? undefined,
      } ?? {},
  });

  const formValues = getValues();

  const onSubmit: SubmitHandler<CreateOrEditRule> = async (data) => {
    if (data.id) {
      const response = await updateRule(data.id, data);
      setSuccess(response?.success);
    }

    if (!data.id) {
      const response = await createRule(data);
      setSuccess(response?.success);
      if (response?.success) router.push(`/app/rule/${response?.data.id}`);
    }
    queryClient.invalidateQueries({
      queryKey: [CONSTANTS.query.RULES],
    });
  };

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
                  options={mapRulesToAutoComplete || []}
                  onChange={(e, data) => {
                    //@ts-ignore
                    if (data?.id === formValues.id) {
                      setError("parentId", { message: "You cant do this!" });
                      setValue("parentId", undefined);
                    }
                    //@ts-ignore
                    return props.field.onChange(data?.id);
                  }}
                  value={
                    mapRulesToAutoComplete &&
                    mapRulesToAutoComplete.find(
                      (rule) => rule.id === formValues.parentId
                    )
                  }
                  defaultValue={{ id: undefined, label: "" }}
                  renderInput={(params) => (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <TextField
                        {...params}
                        helperText={errors.parentId?.message}
                        error={!!errors.parentId?.message}
                        sx={{ maxWidth: "90%" }}
                      />
                      <IconButton
                        size="large"
                        onClick={() => setValue("parentId", undefined)}
                      >
                        <Remove />
                      </IconButton>
                    </Box>
                  )}
                />
              )}
            />
          </FormControl>
        </FormGroup>
      </Box>
    </Paper>
  );
}
