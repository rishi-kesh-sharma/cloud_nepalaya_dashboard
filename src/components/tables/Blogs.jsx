import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_BLOGS } from "../../utils/actions";
import PaginatedTable from "../commons/PaginatedTable";
import Moment from "react-moment";
import { getDocuments } from "../../apiCalls/general";
import Actions from "../commons/Actions";

// columns for table
const columns = [
  { id: "sn", label: "Sn", minWidth: 60 },
  { id: "title", label: "Title", minWidth: 60 },
  { id: "text", label: "Text", minWidth: 60 },
  { id: "author", label: "Author", minWidth: 60 },
  { id: "createdAt", label: "CreatedAt", minWidth: 60 },
  { id: "updatedAt", label: "UpdatedtT", minWidth: 60 },
  { id: "actions", label: "ACTIONS", minWidth: 100 },
];

// create rows
function createData(sn, title, text, author, createdAt, updatedAt, actions) {
  return {
    sn,
    title,
    text,
    author,
    createdAt: <Moment fromNow>{createdAt}</Moment>,
    updatedAt: <Moment fromNow>{updatedAt}</Moment>,
    actions,
  };
}

//component
export default function Table({
  openModal,
  setOpenModal,
  setMode,
  currentId,
  setCurrentId,
  hasAddFeature,
  isAuthorized,
}) {
  const rowsPerPageOptions = [5, 10, 15];

  const dispatch = useDispatch();

  const documents = useSelector((state) => state.blog);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  React.useEffect(() => {
    const getItems = async () => {
      const response = await getDocuments("blog");
      dispatch({ type: SET_BLOGS, payload: response?.data?.documents });
    };
    getItems();
  }, []);

  // handle change rows per page
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  // handlle change page
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  // rows
  const rows = documents?.map((document, index) => {
    const { title, text, author, createdAt, updatedAt, _id } = document;
    return createData(
      index + 1,
      title,
      text,
      author?.username,
      createdAt,
      updatedAt,
      <Actions
        _id={_id}
        setOpenModal={setOpenModal}
        setCurrentId={setCurrentId}
        setMode={setMode}
        currentId={currentId}
        documents={documents}
        type={"blog"}
        actionType={SET_BLOGS}
        hasAddFeature={hasAddFeature}
        isAuthorized={isAuthorized}
      />
    );
  });
  return (
    <PaginatedTable
      openModal={openModal}
      setOpenModal={setOpenModal}
      setMode={setMode}
      rows={rows}
      columns={columns}
      rowsPerPage={rowsPerPage}
      page={page}
      setPage={setPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      count={rows?.length}
      hasAddFeature={hasAddFeature}
      isAuthorized={isAuthorized}
    />
  );
}
