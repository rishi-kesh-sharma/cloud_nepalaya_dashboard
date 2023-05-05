import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_ERROR } from "../actions/errorActions";

const Message = ({ error }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: REMOVE_ERROR, payload: error.id });
    }, 1000);
  }, []);
  return (
    <div className="fixed top-[20px] left-[50%]  translate-x-[-50%] bg-white w-[400px] h-[70px] rounded-md text-center ">
      <p className="mt-[1rem] capitalize text-red-400"> {error.message}</p>
    </div>
  );
};

export default Message;
