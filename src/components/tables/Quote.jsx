import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_QUOTES } from "../../utils/actions";
import PaginatedTable from "../commons/PaginatedTable";
import Moment from "react-moment";
import { getDocuments } from "../../apiCalls/general";
import Actions from "../commons/Actions";

// columns for table
const columns = [
  { id: "sn", label: "Sn", minWidth: 40 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "service", label: "Service", minWidth: 100 },
  { id: "mobile", label: "Mobile", minWidth: 100 },
  { id: "message", label: "Message", minWidth: 100 },
  { id: "createdAt", label: "CreatedAt", minWidth: 60 },
  { id: "actions", label: "Action", minWidth: 100 },
];

// create rows
function createData(
  sn,
  name,
  email,
  mobile,
  service,
  message,
  createdAt,
  actions
) {
  return {
    sn,
    name,
    email,
    mobile,
    service: service || "none",
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

  const documents = useSelector((state) => state.quote);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  React.useEffect(() => {
    const getItems = async () => {
      const response = await getDocuments("quote");
      dispatch({ type: SET_QUOTES, payload: response?.data?.documents });
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
    const { name, email, mobile, service, message, createdAt, _id } = document;
    return createData(
      index + 1,
      name,
      email,
      mobile,
      service?.title,
      message,
      createdAt,
      <Actions
        _id={_id}
        setOpenModal={setOpenModal}
        setCurrentId={setCurrentId}
        setMode={setMode}
        currentId={currentId}
        documents={documents}
        type={"quote"}
        actionType={SET_QUOTES}
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
