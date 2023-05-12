import React, { useEffect, useState } from "react";
import Table from "../../components/tables/User";
import ChangePasswordForm from "../../components/forms/ChangePassword";
import ProfileForm from "../../components/forms/Profile";
import { useSelector } from "react-redux";
import KeepMountedModal from "../../components/commons/Modal";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("view");
  console.log(mode);
  // useEffect(() => {
  //   setMode("view");
  // }, []);
  const auth = useSelector((state) => state?.auth);
  const image = auth?.authenticatedUser?.image;
  const username = auth?.authenticatedUser?.username;
  return (
    <div className="ml-[15rem] xl:ml-[15.5rem] 2xl:ml-[18rem] mb-[3rem]">
      <KeepMountedModal open={openModal} setOpen={setOpenModal} width={500}>
        <ChangePasswordForm setOpenModal={setOpenModal} />
      </KeepMountedModal>
      <div className="grid grid-cols-5 gap-[2rem] py-[3rem] mt-[1.7rem] bg-white min-h-[80vh]  justify-items-center items-start px-[3rem]">
        <div className="col-span-2">
          <img
            className="dropdown rounded-full min-h-[300px] object-contain"
            src={
              image?.filePath
                ? `http://localhost:4000${image?.filePath}/${image?.fileName}`
                : `https://ui-avatars.com/api/?length=1&rounded=true&background=random&name=${username}`
            }
          />
        </div>
        <div className="col-span-3">
          <ProfileForm
            setOpenModal={setOpenModal}
            mode={mode}
            setMode={setMode}
          />
        </div>
      </div>
    </div>
  );
};
export default Page;
