import { Box, Typography } from "@mui/material";
import React from "react";
import { useSnackbar } from "../context/SnackbarContext";
import RenderSnackbarContent from "../components/ui/RenderSnackbarContent";

const CSSuccess = () => {
  const { snackbar } = useSnackbar();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          p: 5,
          opacity: snackbar.navigationView ? 1 : 0,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {snackbar.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            color: "#41505F",
            lineHeight: "1.5rem",
          }}
        >
          <RenderSnackbarContent withLink={true} />
        </Typography>
      </Box>
    </>
  );
};

export default CSSuccess;
