import React from "react";
import Error from "./Message";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
  const errors = useSelector((state) => state.errorReducer);
  return (
    <div>
      {errors.map((error) => (
        <Message error={error} />
      ))}
    </div>
  );
};

export default Messages;
