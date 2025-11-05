import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContractData } from "../context/ContractMetaDataContext";
import { Loader } from "../components/ui";
import { useContractOperations } from "../hooks/useContractOperations";
import { restApiRequest } from "../../utils/commonMethod";

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

  const CONTRACT_OPTIONS = [
    {
      value: "https://app.contractsafe.com/",
      label: "United States",
    },
    {
      value: "https://app.contractsafe.eu/",
      label: "Europe",
    },
    {
      value: "https://app.contractsafe.ca/",
      label: "Canada",
    },
    {
      value: "https://au.contractsafe.com/",
      label: "Australia",
    },
    {
      value: "https://vendor-2.contractsafe.com/",
      label: "Vendor 2",
    },
    {
      value: "https://preprod.contractsafe.com/",
      label: "Pre Prod",
    },
  ];

  const getData = async () => {
    try {
      const data = await restApiRequest(`ms_word/categories`, {
        method: "GET",
      });

      console.log("DATA ::", data);

      return data;
    } catch (e) {
      console.log("Error :", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

         

            {/* <FormControl fullWidth sx={{ minWidth: 200 }}>
              <Select
                // value={selectedOption}
                // onChange={handleSelectionChange}
                displayEmpty
                // renderValue={renderSelectValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#BDBDBD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              >
                {CONTRACT_OPTIONS.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

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
                  validate: (value) =>
                    value.trim().length > 3 || "Contract name cannot be empty or spaces only",
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
              disabled={isLoading || !!errors.newContractName}
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
