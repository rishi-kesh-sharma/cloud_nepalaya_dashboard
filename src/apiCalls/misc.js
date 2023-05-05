import axios from "axios";
import { BASE_URL } from "../constants/constants";
export const getOverview = async () => {
  const response = await axios.get(`${BASE_URL}/misc/admin/overview`, {
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
  console.log(response.data);
  return response.data;
};
