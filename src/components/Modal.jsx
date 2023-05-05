import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  borderRadius: "10px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  // maxHeight: "90vh",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal({ open, setOpen, children }) {
  //   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  //   const open = true;
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box
          sx={style}
          className="bg-red-400 border border-gray-200 outline-none">
          {children}
        </Box>
      </Modal>
    </div>
  );
}
