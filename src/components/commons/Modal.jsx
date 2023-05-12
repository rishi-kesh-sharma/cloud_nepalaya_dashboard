import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RxCross1 } from "react-icons/rx";

const style = {
  position: "absolute",
  borderRadius: "10px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "70vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function KeepMountedModal({ open, setOpen, children, width }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="bg-white">
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box
          sx={style}
          className={`min-w-[50vw] max-w-[1000px] bg-white  border border-gray-200 outline-none relative px-[2rem] pt-[2rem] pb-[2rem] xl:pl-[2rem]`}>
          {children}
          <RxCross1
            onClick={handleClose}
            className="absolute cursor-pointer text-red-600 text-lg top-[1rem] right-[1rem]"
          />
        </Box>
      </Modal>
    </div>
  );
}
