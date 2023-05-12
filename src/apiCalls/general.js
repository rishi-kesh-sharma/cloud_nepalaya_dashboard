import axios from "axios";
import { BASE_URL } from "../constants/constants";

export const createDocument = async (type, values) => {
  try {
    const response = axios.post(`${BASE_URL}/${type}`, values, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const getDocuments = async (type) => {
  try {
    const response = axios.get(`${BASE_URL}/${type}`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const getDocument = async (type, _id) => {
  try {
    const response = axios.get(`${BASE_URL}/${type}/${_id}`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};
export const updateDocument = async (type, _id, values) => {
  try {
    const response = axios.put(`${BASE_URL}/${type}/${_id}`, values, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const updateMe = async (type, values) => {
  console.log(values);
  try {
    const response = axios.put(`${BASE_URL}/user/${type}/me`, values, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const deleteMe = async (type, values) => {
  try {
    const response = axios.delete(`${BASE_URL}/${type}/me`, values, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const deleteDocument = async (type, _id) => {
  try {
    const response = axios.delete(`${BASE_URL}/${type}/${_id}`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
