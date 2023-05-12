import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_CONTACTS } from "../../utils/actions";
import PaginatedTable from "../commons/PaginatedTable";
import Moment from "react-moment";
import { getDocuments } from "../../apiCalls/general";
import Actions from "../commons/Actions";

// columns for table
const columns = [
  { id: "sn", label: "Sn", minWidth: 40 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "subject", label: "Subject", minWidth: 100 },
  { id: "message", label: "Message", minWidth: 100 },
  { id: "createdAt", label: "CreatedAt", minWidth: 60 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

// create rows
function createData(sn, name, email, subject, message, createdAt, actions) {
  return {
    sn,
    name,
    email,
    subject,
    message,
    createdAt: <Moment fromNow>{createdAt}</Moment>,
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

  const documents = useSelector((state) => state.contact);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  React.useEffect(() => {
    const getItems = async () => {
      const response = await getDocuments("contact");
      dispatch({ type: SET_CONTACTS, payload: response?.data?.documents });
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
    const { name, email, subject, message, createdAt, _id } = document;
    return createData(
      index + 1,
      name,
      email,
      subject,
      message,
      createdAt,
      <Actions
        _id={_id}
        setOpenModal={setOpenModal}
        setCurrentId={setCurrentId}
        setMode={setMode}
        currentId={currentId}
        documents={documents}
        type={"contact"}
        actionType={SET_CONTACTS}
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
