import React, { useState } from "react";
import Table from "../../components/tables/User";
import Form from "../../components/forms/User";
import { useSelector } from "react-redux";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [mode, setMode] = useState("view");
  const auth = useSelector((state) => state?.auth);
  const isAuthorized = auth?.authenticatedUser?.role == "superadmin";
  const hasAddFeature = true;
  return (
    <div className="">
      {openModal ? (
        <div className="ml-[15rem] xl:[15.5rem] 2xl:[18rem] 2xl:ml-[18rem] mt-[1.7rem] mb-[3rem] mr-[2rem]">
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
