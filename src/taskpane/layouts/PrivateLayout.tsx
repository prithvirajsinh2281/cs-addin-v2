import React from "react";
import { Box, Paper } from "@mui/material";
import { Footer } from "../components/layouts";
import { SnackbarProvider } from "../context/SnackbarContext";

export default function PrivateLayout({ children }) {
  return (
    <>
      <SnackbarProvider>
        <Paper
          elevation={0}
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              maxWidth: 400,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {children}
            <Footer />
          </Box>
        </Paper>
      </SnackbarProvider>
    </>
  );
}
