import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "./PrimaryButton";

const DiscardEditsModal = ({ open, onClose, onDiscard, title, description }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-end",
          backgroundColor: "#00000070",
        },
        "& .MuiDialog-paper": {
          margin: 4,
          borderRadius: 1,
          padding: 2,
        },
      }}
    >
      <Box display="flex" flexDirection="column" px={2} pt={2} alignItems="center">
        {/* <IconButton onClick={onClose} size="small" sx={{ flexShrink: 0, alignSelf: "flex-end" }}>
          <CloseIcon />
        </IconButton> */}
        <DialogTitle
          sx={{
            p: 0,
            fontWeight: "bold",
            fontSize: "1.1rem",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "calc(100% - 48px)",
            pr: 1,
            textAlign: "center",
          }}
        >
          {title}
        </DialogTitle>
      </Box>

      <DialogContent sx={{ p: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: "center",
          }}
        >
          {description}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
        }}
      >
        <PrimaryButton
          variant="outlined"
          onClick={onClose}
          size="small"
          sx={{
            flex: 1,
          }}
          label="Cancel"
        />
        <PrimaryButton
          label="Discard"
          onClick={onDiscard}
          sx={{
            flex: 1,
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DiscardEditsModal;
