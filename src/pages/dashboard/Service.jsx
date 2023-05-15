import React, { useState } from "react";
import Table from "../../components/tables/Service";
import KeepMountedModal from "../../components/commons/Modal";
import Form from "../../components/forms/Service";
import { useSelector } from "react-redux";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [mode, setMode] = useState("view");
  const hasAddFeature = true;
  const auth = useSelector((state) => state?.auth);
  const isAuthorized =
    auth?.authenticatedUser?.role == "superadmin" ||
    auth?.authenticatedUser?.role == "admin";
  return (
    <div className="">
      {openModal ? (
        <div className="ml-[15rem] mt-[1.7rem] mr-[2rem] xl:ml-[15.5rem] 2xl:ml-[18rem] mb-[1.7rem]">
          {/* <KeepMountedModal open={openModal} setOpen={setOpenModal} width={900}> */}
          <Form
            currentId={currentId}
            setOpenModal={setOpenModal}
            mode={mode}
            setMode={setMode}
            isAuthorized={isAuthorized}
          />
        </div>
      ) : (
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
      )}
    </div>
  );
};
export default Page;
