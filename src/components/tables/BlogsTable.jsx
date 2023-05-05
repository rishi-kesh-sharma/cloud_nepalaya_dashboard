import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, getAllBlogs, updateBlog } from "../../apiCalls/blogs";
import { SET_BLOGS } from "../../actions/blogActions";
import PaginatedTable from "./PaginatedTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import Moment from "react-moment";
import Swal from "sweetalert2";
const columns = [
  { id: "sn", label: "SN", minWidth: 60 },
  { id: "title", label: "TITLE", minWidth: 60 },
  { id: "text", label: "TEXT", minWidth: 60 },
  { id: "author", label: "AUTHOR", minWidth: 60 },
  { id: "createdAt", label: "CREATED AT", minWidth: 60 },
  { id: "updatedAt", label: "UPDATED AT", minWidth: 60 },
  // { id: "actions", label: "Actions", minWidth: 100 },
];

function createData(sn, title, text, author, createdAt, updatedAt, actions) {
  return {
    sn,
    title,
    text,
    author,
    createdAt: <Moment fromNow>{createdAt}</Moment>,
    updatedAt: <Moment fromNow>{updatedAt}</Moment>,
  };
}
export default function BlogsTable({
  setOpenUpdateModal,
  openAddModal,
  setOpenAddModal,
  setEditingUserId,
}) {
  const [loading, setLoading] = useState(false);
  const rowsPerPageOptions = [5, 10, 15];
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const blogsInfo = useSelector((state) => state?.blogReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // rows per page options

  // use effect that run when page and search query is changed
  React.useEffect(() => {
    const getBlogsInfo = async () => {
      setLoading(true);
      const response = await getAllBlogs(searchQuery, page + 1, rowsPerPage);
      setLoading(false);
      dispatch({ type: SET_BLOGS, payload: response.data });
    };
    getBlogsInfo();
  }, []);

  // handle change rows per page
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  // handlle change page
  const handleChangePage = (e, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  // handle edit
  const handleEdit = async (_id) => {
    setOpenUpdateModal(true);
    setEditingUserId(_id);
  };

  // handle delete
  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteBlog(_id);
        if (response.status != 200) {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }

        const blogs = blogsInfo.blogs.filter((blog) => blog._id != _id);
        const allBlogsInfo = {
          blogs,
          skip: blogsInfo.skip,
          prev: blogsInfo.prev,
          next: blogsInfo.next,
          count: blogsInfo.count,
        };
        dispatch({ type: SET_BLOGS, payload: allBlogsInfo });

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const rows = blogsInfo?.blogs?.map((blog, index) => {
    const { title, text, author, createdAt, updatedAt, _id } = blog;
    return createData(
      index + 1,
      title,
      text,
      author?.username,
      createdAt,
      updatedAt
    );
  });

  return (
    <PaginatedTable
      openAddModal={openAddModal}
      setOpenAddModal={setOpenAddModal}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      rows={rows}
      columns={columns}
      rowsPerPage={rowsPerPage}
      page={page}
      setPage={setPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      count={rows?.length}
    />
  );
}
