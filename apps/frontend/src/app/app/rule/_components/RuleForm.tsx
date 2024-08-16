"use client";

import { SyntheticEvent, useEffect, useMemo, useState } from "react";
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
import {
  createRule,
  deleteRule,
  getAllRules,
  updateRule,
} from "./rule.actions";
import { Delete, Remove } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CONSTANTS } from "@/constants";
import { DeleteRuleModal } from "./DeleteRuleModal";

interface Props {
  rule?: Rule;
}

export function RuleForm({ rule }: Props) {
  const [success, setSuccess] = useState<boolean>();
  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: rules } = useQuery({
    queryKey: [CONSTANTS.query.RULE_AUTOCOMPLETE_LIST],
    queryFn: () => getAllRules(),
  });

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    control,
    watch,
  } = useForm<CreateOrEditRule>({
    resolver: zodResolver(createOrEditRule),
    defaultValues:
      {
        ...rule,
        parentId: rule?.parent?.id ?? undefined,
      } ?? {},
  });

  const parentFieldWatcher = watch("parentId");

  const formValues = getValues();
  const mapRulesToAutoComplete =
    rules !== undefined &&
    rules.map((rule) => ({ label: rule.name, id: rule.id }));

  const onSubmit: SubmitHandler<CreateOrEditRule> = async (data) => {
    if (data.id) {
      const response = await updateRule(data.id, data);
      setSuccess(response?.success);
    }

    if (!data.id) {
      const response = await createRule(data);
      setSuccess(response?.success);
      if (response?.success)
        router.push(`/app/rule/${response?.data.id}/details`);
    }
    queryClient.invalidateQueries({
      queryKey: [CONSTANTS.query.RULES],
    });
  };

  const handleOnDeleteClick = async () => {
    if (!rule) return console.log("No ID provided.");

    //@ts-ignore
    const response = await deleteRule(rule!.id);
    if (response.success) {
      setOpen(false);
    }
  };

  const autocompletValue =
    mapRulesToAutoComplete &&
    watch("parentId") &&
    mapRulesToAutoComplete.find((rule) => rule.id === formValues.parentId);

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
            <IconButton onClick={() => setOpen(!open)}>
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
                  options={
                    mapRulesToAutoComplete || [{ id: undefined, label: "" }]
                  }
                  onChange={(e, data) => {
                    console.log(data);
                    if (!data) return;

                    if (data === null) setValue("parentId", undefined);

                    if (data?.id === formValues.id) {
                      setError("parentId", { message: "You cant do this!" });
                      setValue("parentId", undefined);
                    }

                    return props.field.onChange(data.id);
                  }}
                  value={autocompletValue}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={errors.parentId?.message}
                      error={!!errors.parentId?.message}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </FormGroup>
      </Box>
      {rule && rule.id && (
        <DeleteRuleModal
          ruleId={rule.id}
          open={open}
          setOpen={setOpen}
          handleOnDeleteClick={handleOnDeleteClick}
        />
      )}
    </Paper>
  );
}
