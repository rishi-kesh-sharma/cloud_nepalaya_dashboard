import React from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import { useSelector } from "react-redux";
const Pagination = ({ currentPage, setCurrentPage }) => {
  const { next, prev } = useSelector((state) => state.bankReducer);
  const handlePrevClick = (e) => {
    if (currentPage == 1) return;
    setCurrentPage(currentPage - 1);
  };
  const handleNextClick = (e) => {
    if (!next) return;
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="h-[7rem] fixed left-[92.2%] mt-[1rem] flex justify-center items-center gap-[1rem] md:h-[3rem] md:justify-start md:w-[80%] mx-auto lg:h-[2rem]">
      <button disabled={!prev && true} className="disabled:opacity-70">
        {" "}
        <BsArrowLeftSquare
          onClick={handlePrevClick}
          className="bg-red-500  text-[2.4rem] rounded-md text-white"
        />
      </button>
      <button disabled={!next && true} className="disabled:opacity-70">
        {" "}
        <BsArrowRightSquare
          onClick={handleNextClick}
          className="bg-red-500  text-[2.4rem] rounded-md"
          style={{ color: "white" }}
        />
      </button>
    </div>
  );
};

export default Pagination;
