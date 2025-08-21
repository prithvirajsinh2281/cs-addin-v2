import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import { LifeBuoyIcon, Settings } from "lucide-react";
import GotoContractSafe from "../ui/GotoContractSafe";

const Footer = ({ type }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderTop: "1px solid #d4d8db",
        padding: "8px 12px",
      }}
    >
      <GotoContractSafe type={type} />

      <Stack direction="row" spacing={2.5}>
        <IconButton
          size="small"
          onClick={() => window.open("https://www.contractsafe.com/support", "_blank")}
          sx={{
            padding: 0,
          }}
        >
          <LifeBuoyIcon size={20} />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => window.open("https://www.contractsafe.com/support", "_blank")}
          sx={{
            padding: 0,
          }}
        >
          <Settings size={20} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
