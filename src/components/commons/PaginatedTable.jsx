import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import SearchBar from "./SearchBar";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

export default function PaginatedTable({
  setOpenModal,
  setMode,
  rows,
  columns,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPageOptions,
  count,
  hasAddFeature,
  isAuthorized,
}) {
  const auth = useSelector((state) => state?.auth);
  const handleAddClick = () => {
    setOpenModal(true);
    setMode("create");
  };
  return (
    <div className="mt-[1.7rem] max-w-[3000px] ml-[18vw] bg-white py-[1rem] overflow-hidden w-[80vw]">
      {hasAddFeature && isAuthorized && (
        <div className="flex items-end justify-end pr-[1rem] ">
          <IoMdAddCircleOutline
            onClick={handleAddClick}
            className="text-[3rem] bg-[#316EFF] text-white p-[0.5rem] rounded-full cursor-pointer"
          />
        </div>
      )}
      {/* <div className="flex items-end justify-end p-[0.7rem]"> </div> */}
      <TableContainer className="max-h-[60vh]" sx={{ overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  className="text-gray-600"
                  key={column?.id}
                  align={column?.align}
                  style={{ minWidth: column?.minWidth }}>
                  {column?.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={page * rowsPerPage + index + 1}>
                      {columns?.map((column) => {
                        const value = row[column?.id];
                        return (
                          <TableCell
                            key={`${column?.id}${index}`}
                            align="left"
                            className="">
                            {typeof value == "object" &&
                            Array?.isArray(value) ? (
                              <div style={{ display: "flex", gap: "0.7rem" }}>
                                {value?.map((item, index) => (
                                  <p key={Math.random()}> {item?.link}</p>
                                ))}
                              </div>
                            ) : value?.length > 40 ? (
                              `${value?.slice(0, 30)}...`
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <></>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
