import axios from "axios";
export const getMisc = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/misc`,
    {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    }
  );
  return response.data;
};
