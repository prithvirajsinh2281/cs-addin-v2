import { Box, Typography } from "@mui/material";
import React from "react";
import { useContractData } from "../context/ContractMetaDataContext";

const ExpiredCSLock = () => {
  const { properties } = useContractData();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 5,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Check Out Document Before Editing!
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: "1rem",
          color: "#41505F",
          lineHeight: "1.5rem",
        }}
      >
        You've already saved a version of {properties.ctSafeContractTitle} back to ContractSafe,
        unlocking the document for other users to edit. Please check out again before editing it in
        Word.
      </Typography>
    </Box>
  );
};

export default ExpiredCSLock;
