import React, { createContext, useState } from "react";
import BlogsTable from "./tables/BlogsTable";
import KeepMountedModal from "./Modal";
import BlogUpdateForm from "./forms/BlogUpdateForm";
import AddBlogForm from "./forms/AddBlogForm";

const BlogContext = createContext();
const Blogs = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  return (
    <div className="">
      <BlogsTable
        openUpdateModal={openUpdateModal}
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
        setOpenUpdateModal={setOpenUpdateModal}
        setEditingUserId={setEditingUserId}
      />
      <>
        <KeepMountedModal open={openUpdateModal} setOpen={setOpenUpdateModal}>
          <BlogUpdateForm
            editingUserId={editingUserId}
            setOpen={setOpenUpdateModal}
          />
        </KeepMountedModal>
      </>
      <>
        <KeepMountedModal open={openAddModal} setOpen={setOpenAddModal}>
          <AddBlogForm setOpen={setOpenAddModal} />
        </KeepMountedModal>
      </>
    </div>
  );
};

export default Blogs;
