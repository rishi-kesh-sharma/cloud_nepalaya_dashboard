import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_FAQS, SET_SERVICES } from "../../utils/actions";
import PaginatedTable from "../commons/PaginatedTable";
import Moment from "react-moment";
import { getDocuments } from "../../apiCalls/general";
import Actions from "../commons/Actions";

// columns for table
const columns = [
  { id: "sn", label: "Sn", minWidth: 40 },
  { id: "question", label: "Question", minWidth: 100 },
  { id: "answer", label: "Answer", minWidth: 100 },
  { id: "createdAt", label: "CreatedAt", minWidth: 60 },
  { id: "updatedAt", label: "UpdatedAt", minWidth: 60 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

// create rows
function createData(sn, question, answer, createdAt, updatedAt, actions) {
  return {
    sn,
    question,
    answer,
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

  const documents = useSelector((state) => state.FAQ);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  React.useEffect(() => {
    const getItems = async () => {
      const FAQresponse = await getDocuments("faq");
      const serviceResponse = await getDocuments("service");
      dispatch({ type: SET_FAQS, payload: FAQresponse?.data?.documents });
      dispatch({
        type: SET_SERVICES,
        payload: serviceResponse?.data?.documents,
      });
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
    const { question, answer, createdAt, updatedAt, _id } = document;
    return createData(
      index + 1,
      question,
      answer,
      createdAt,
      updatedAt,
      <Actions
        _id={_id}
        setOpenModal={setOpenModal}
        setCurrentId={setCurrentId}
        setMode={setMode}
        currentId={currentId}
        documents={documents}
        type={"faq"}
        actionType={SET_FAQS}
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
