import axios from "axios";
import { BASE_URL } from "../constants/constants";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const logoutUser = async () => {
  //   console.log(localStorage.getItem("token"));
  try {
    const response = await axios.get(`${BASE_URL}/auth/logout`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
export const checkTokenValidity = async () => {
  const authToken = localStorage.getItem("auth-token");
  if (!authToken) return { isValid: false, user: {} };

  try {
    const response = await axios.get(`${BASE_URL}/auth/isTokenValid`, {
      headers: {
        "auth-token": authToken,
      },
    });
    return { isValid: true, user: response.data.user };
    // return response;
  } catch (err) {
    return { isValid: false };
  }
};
