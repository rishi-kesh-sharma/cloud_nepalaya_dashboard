import React, { useState } from "react";
import Table from "../../components/tables/Contact";
import KeepMountedModal from "../../components/commons/Modal";
import Form from "../../components/forms/Service";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [mode, setMode] = useState("view");
  const hasAddFeature = false;
  return (
    <div className="ml-[15rem] mt-[1.7rem] bg-white px-[2rem] py-[2rem] rounded-lg max-w-[900px]">
      <>
        <Form
          currentId={currentId}
          setOpenModal={setOpenModal}
          mode={mode}
          setMode={setMode}
        />
      </>
    </div>
  );
};
export default Page;
