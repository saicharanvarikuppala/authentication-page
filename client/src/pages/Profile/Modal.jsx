import React from "react";
import {
  Modal as MuiModal,
  Box,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const ModalComponent = ({ open, onClose, children, closeLabel, sx, title }) => {
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    onClose();
  };
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Box sx={sx}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            background: "#fff",
            borderBottom: "1px solid #ddd",
            boxShadow: 4,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            maxHeight: 50,
            minHeight: 50,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="span"
            sx={{ ml: 2, fontSize: "1rem" }}
          >
            {title}
          </Typography>
          <IconButton sx={{ p: 0.5, mr: 2 }} onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
        <Box
          sx={{
            p: 1,
            pt: 1,
            overflow: "auto",
            paddingLeft: "12px",
            height: "80%",
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
};

export default ModalComponent;
