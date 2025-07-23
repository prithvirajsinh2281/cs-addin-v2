import { Typography } from "@mui/material";
import React from "react";
import { useContractData } from "../../context/ContractMetaDataContext";

const Header = () => {
  const { properties } = useContractData();

  return (
    <Typography
      variant="h6"
      fontWeight="400"
      sx={{
        color: "#566371",
        padding: "10px",
        borderBottom: "1px solid #d4d8db",
      }}
    >
      {properties?.ctSafeContractTitle || "New Contract!"} 
    </Typography>
  );
};

export default Header;
