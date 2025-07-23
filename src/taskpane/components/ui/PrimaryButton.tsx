import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({ label, onClick,...rest }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      onClick={onClick}
      // size="medium"
      size="small"
      sx={{
        // fontSize: "16px",
        fontSize: "14px",
        borderRadius:1.5
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
