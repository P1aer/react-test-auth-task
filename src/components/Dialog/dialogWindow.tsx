import React from "react";
import { Button, Container, Dialog, DialogTitle } from "@mui/material";
import "./index.scss";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Container maxWidth="md" className="modal">
        <DialogTitle sx={{ mb: "1rem", textAlign: "center" }}>
          Username or password are incorrect
        </DialogTitle>
        <Button size="large" variant="contained" onClick={handleClose}>
          OK
        </Button>
      </Container>
    </Dialog>
  );
}
export default SimpleDialog;
