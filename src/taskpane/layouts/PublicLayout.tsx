import React, { useState } from "react";
import { Box, Typography, Paper, FormControl, Select, MenuItem } from "@mui/material";
import { Footer } from "../components/layouts";
import { PrimaryButton } from "../components/ui";
import useLoginDialogBox from "../hooks/useLoginDialogBox";
import { useToken } from "../context/TokenContext";

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
];

const PLACEHOLDER_TEXT = "Select an Option";

export default function PublicLayout() {
  const handleDialogBox = useLoginDialogBox();
  const [selectedOption, setSelectedOption] = useState("");

  const { metadata, setMetadata } = useToken();

  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(event.target.value);
    setMetadata({
      ...metadata,
      ctSafeBaseUrl: value,
    });
  };

  const renderSelectValue = (selected) => {
    if (!selected) return <>{PLACEHOLDER_TEXT}</>;

    const selectedItem = CONTRACT_OPTIONS.find((item) => item.value === selected);
    return selectedItem?.label || selected;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" gap={5}>
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src="https://vendor-2.contractsafe.com/static/assets/favicons/favicon.png"
              alt="ContractSafe Logo"
              sx={{ width: 64, height: 64, borderRadius: 4 }}
            />
          </Box>

          {/* Headings */}
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h4" fontWeight="bold">
              Welcome to <br />
              ContractSafe!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#41505F", fontWeight: 600 }}>
              Your Contracts. One Click Away.
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "#566371",
              lineHeight: "1.3rem",
            }}
          >
            Easily manage your contracts without ever leaving Word. The ContractSafe Add-in allows
            you to save, update, or create new contracts directly from your document. Seamlessly
            sync changes, discard edits, and ensure your contract versions stay organized and secure
            all from within your familiar Word environment.
          </Typography>

          {/* Dropdown Selection */}
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <Select
              value={selectedOption}
              onChange={handleSelectionChange}
              displayEmpty
              renderValue={renderSelectValue}
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
          </FormControl>

          <PrimaryButton label="Get Started" onClick={handleDialogBox} />
        </Box>
      </Box>
      <Footer />
    </Paper>
  );
}
