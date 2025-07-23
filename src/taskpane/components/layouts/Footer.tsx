import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import { ExternalLinkIcon, LifeBuoyIcon, Settings, } from "lucide-react";
import GetLink from "../ui/GetLink";

const Footer = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderTop: "1px solid #d4d8db",
        padding: "8px 12px",
        // bgcolor: "#fff"
      }}
    >
      <GetLink
        //  url={metadata?.ctSafeBaseUrl + "v3/contracts/" + properties?.ctSafeContractId}
        url="Some Url"
        sx={{
          background: "#f4f5f6",
          padding: ".5rem",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        <ExternalLinkIcon size={16} />
        Go to ContractSafe
      </GetLink>

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
