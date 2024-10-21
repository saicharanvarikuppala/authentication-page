import React from "react";
import { Modal, Fade, Box, Typography, Button } from "@mui/material";

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmationText,
  cancelText,
}) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 500,
            width: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography sx={{ mt: 2 }}>{message}</Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} color="primary" sx={{ mr: 1 }}>
              {cancelText}
            </Button>
            <Button onClick={onConfirm} color="error">
              {confirmationText}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;
