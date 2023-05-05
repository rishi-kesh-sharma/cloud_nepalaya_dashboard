import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import SearchBar from "./../SearchBar";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function PaginatedTable({
  setOpenAddModal,
  rows,
  columns,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPageOptions,
  count,
}) {
  console.log(count);
  const handleAddClick = () => {
    setOpenAddModal(true);
  };
  return (
    <Paper
      className="pt-[1.5rem]"
      sx={{
        width: "80vw",
        maxWidth: "3000px",
        overflow: "hidden",
        marginTop: "4rem",
        marginLeft: "18vw",
        // padding: "0 2rem",
        overflow: "hidden",
      }}>
      <div className="flex items-end justify-end pr-[1rem] ">
        <IoMdAddCircleOutline
          onClick={handleAddClick}
          className="text-[3rem] bg-[#316EFF] text-white p-[0.5rem] rounded-full cursor-pointer"
        />{" "}
      </div>
      <div className="flex items-end justify-end p-[0.7rem]"> </div>
      <TableContainer sx={{ maxHeight: 430, overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className="text-gray-600"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={page * rowsPerPage + index + 1}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="left" className="">
                            {typeof value == "object" &&
                            Array.isArray(value) ? (
                              <div style={{ display: "flex", gap: "0.7rem" }}>
                                {value.map((item) => item.link)}
                              </div>
                            ) : value?.length > 40 ? (
                              `${value.slice(0, 30)}...`
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
    </Paper>
  );
}
