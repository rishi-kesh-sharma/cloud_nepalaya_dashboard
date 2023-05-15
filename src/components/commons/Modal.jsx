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

  bgcolor: "background.paper",
  boxShadow: 24,
};
export default function KeepMountedModal({ open, setOpen, children, width }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="bg-white rounded-lg min-w-[50vw] max-w-[1000px] overflow-auto max-h-[70vh]">
      <Modal
        className=""
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box
          sx={style}
          className={`bg-white  border border-gray-200 outline-none relative pl-[2rem] pt-[2rem] pb-[2rem] xl:pl-[2rem] rounded-lg `}>
          <RxCross1
            onClick={handleClose}
            className="absolute cursor-pointer text-red-600 text-lg top-[1rem] right-[2rem]"
          />
          <div className="max-h-[70vh] overflow-auto min-w-[50vw] pr-[2rem]">
            {children}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
