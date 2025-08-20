import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContractData } from "../context/ContractMetaDataContext";
import { Loader } from "../components/ui";
import { useContractOperations } from "../hooks/useContractOperations";

const SaveAsNew = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newContractName: "",
    },
  });

  const { properties, setProperties } = useContractData();
  const navigate = useNavigate();
  const { isLoading, saveNew } = useContractOperations();

  const navigateBack = () => navigate("/");

  const onSubmit = async (data: { newContractName: string }) => {
    const { newContractName } = data;

    setProperties({ ...properties, ctSafeContractTitle: newContractName });

    await saveNew(newContractName);
  };

  return (
    <>
      <Loader loading={isLoading} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          p: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={navigateBack}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            Save as New Contract
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="subtitle2">Contract Name</Typography>
              <Controller
                name="newContractName"
                control={control}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Contract name must be at least 3 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputProps={{
                      style: {
                        backgroundColor: "#f9fafb",
                        fontWeight: 500,
                      },
                    }}
                    error={!!errors.newContractName}
                    helperText={errors.newContractName?.message}
                  />
                )}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading || (!!errors.newContractName)}
              type="submit"
            >
              Save as New Contract
            </Button>
            {properties ? (
              <Button variant="outlined" fullWidth onClick={navigateBack} disabled={isLoading}>
                Cancel
              </Button>
            ) : null}
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default SaveAsNew;