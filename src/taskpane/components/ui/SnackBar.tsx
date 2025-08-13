import React, { ReactElement } from "react";
import { Box, Typography, Button, Stack, Paper, Link } from "@mui/material";
import { CheckCircle, AlertCircle } from "lucide-react";

type SuccessNotificationProps = {
  title?: string;
  message: ReactElement;
  severity?: "success" | "error" | "info" | "warning";
  onDismiss: () => void;
};

const SuccessNotification = ({
  title,
  message,
  severity = "success",
  onDismiss,
}: SuccessNotificationProps) => {
  const getIcon = () => {
    switch (severity) {
      case "error":
        return <AlertCircle color="#d32f2f" size={28} />;
      default:
        return <CheckCircle color="#1a9c05" size={28} />;
    }
  };

  const getColors = () => {
    switch (severity) {
      case "error":
        return {
          bg: "#ffebee",
          border: "#d32f2f",
          titleColor: "#d32f2f",
          textColor: "#b71c1c",
          buttonBg: "#ffcdd2",
          buttonColor: "#d32f2f",
          buttonHover: "#ffb3ba",
        };
      default:
        return {
          bg: "#f0fff4",
          border: "#1a9c05",
          titleColor: "#1a9c05",
          textColor: "#0e5902",
          buttonBg: "#def0db",
          buttonColor: "#168504",
          buttonHover: "#c6f6d5",
        };
    }
  };

  const colors = getColors();

  const getDefaultTitle = () => {
    switch (severity) {
      case "error":
        return "Something went wrong!";
      default:
        return "Successfully Updated!";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: colors.bg,
        borderLeft: `2px solid ${colors.border}`,
        p: 3,
        mx: "auto",
        borderRadius: 0,
        position: "absolute",
        bottom: 0,
        zIndex: 9,
        width: "100%",
      }}
    >
      <Stack spacing={2}>
        <Box display="flex" alignItems="center">
          <Box sx={{ mr: 1 }}>{getIcon()}</Box>
          <Typography variant="h6" fontWeight="bold" color={colors.titleColor}>
            {title || getDefaultTitle()}
          </Typography>
        </Box>

        {message}

        <Box>
          <Button
            variant="text"
            onClick={onDismiss}
            sx={{
              backgroundColor: colors.buttonBg,
              color: colors.buttonColor,
              fontWeight: 600,
              px: 3,
              "&:hover": {
                backgroundColor: colors.buttonHover,
              },
            }}
          >
            Dismiss
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default SuccessNotification;