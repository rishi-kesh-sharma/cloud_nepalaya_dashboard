import axios from "axios";
import { BASE_URL } from "../constants/constants";
export const getMisc = async () => {
  const response = await axios.get(`${BASE_URL}/misc`, {
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
  return response.data;
};
