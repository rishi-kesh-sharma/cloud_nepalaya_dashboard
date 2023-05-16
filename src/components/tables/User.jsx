import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_USERS } from "../../utils/actions";
import PaginatedTable from "../commons/PaginatedTable";
import Moment from "react-moment";
import { getDocuments } from "../../apiCalls/general";
import Actions from "../commons/Actions";

// columns for table
const columns = [
  { id: "sn", label: "Sn", minWidth: 40 },
  { id: "image", label: "Profile", minWidth: 40 },
  { id: "username", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "createdAt", label: "CreatedAt", minWidth: 60 },
  { id: "updatedAt", label: "UpdatedAt", minWidth: 60 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

// create rows
function createData(
  sn,
  image,
  username,
  email,
  role,
  createdAt,
  updatedAt,
  actions
) {
  return {
    sn,
    image: (
      <img
        className="h-8 w-8 rounded-full object-fill"
        src={
          image?.filePath
            ? `${process.env.REACT_APP_SERVER_BASE_URL}${image?.filePath}/${image?.fileName}`
            : `https://ui-avatars.com/api/?length=1&rounded=true&background=random&name=${username}`
        }
      />
    ),
    username,
    email,
    role,
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

  const documents = useSelector((state) => state?.user);
  console.log(documents);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  React.useEffect(() => {
    const getItems = async () => {
      const response = await getDocuments("user");
      dispatch({ type: SET_USERS, payload: response?.data?.documents });
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
    const { image, username, email, role, createdAt, updatedAt, _id } =
      document;
    return createData(
      index + 1,
      image,
      username,
      email,
      role?.toString(),
      createdAt,
      updatedAt,
      <Actions
        _id={_id}
        setOpenModal={setOpenModal}
        setCurrentId={setCurrentId}
        setMode={setMode}
        currentId={currentId}
        documents={documents}
        type={"user"}
        actionType={SET_USERS}
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
