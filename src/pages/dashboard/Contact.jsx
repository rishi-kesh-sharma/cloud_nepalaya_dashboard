import React, { useState } from "react";
import Table from "../../components/tables/Contact";
import KeepMountedModal from "../../components/commons/Modal";
import Form from "../../components/forms/Contact";
import { useSelector } from "react-redux";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [mode, setMode] = useState("view");
  const auth = useSelector((state) => state?.auth);
  const isAuthorized =
    auth?.authenticatedUser?.role == "superadmin" ||
    auth?.authenticatedUser?.role == "admin";

  const hasAddFeature = false;
  return (
    <div className="">
      <Table
        openModal={openModal}
        setOpenModal={setOpenModal}
        currentId={currentId}
        setCurrentId={setCurrentId}
        setMode={setMode}
        mode={mode}
        hasAddFeature={hasAddFeature}
        isAuthorized={isAuthorized}
      />
      <>
        <KeepMountedModal open={openModal} setOpen={setOpenModal}>
          <Form
            currentId={currentId}
            setOpenModal={setOpenModal}
            mode={mode}
            setMode={setMode}
            isAuthorized={isAuthorized}
          />
        </KeepMountedModal>
      </>
    </div>
  );
};
export default Page;
