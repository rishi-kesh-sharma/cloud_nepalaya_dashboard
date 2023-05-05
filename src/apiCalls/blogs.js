import axios from "axios";
import { BASE_URL } from "../constants/constants";
export const getAllBlogs = async (keyword, page, rowsPerPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/blog/all?keyword=${keyword}&page=${page}`,
      {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "rows-per-page": rowsPerPage,
        },
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
export const registerBlog = async (data) => {
  try {
    try {
      const response = await axios.post(
        `${BASE_URL}/blog/admin/register`,
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      return response;
    } catch (err) {
      return err.response;
    }
  } catch (err) {
    return err.response;
  }
};
export const updateBlog = async (blogId, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/admin/${blogId}`, data, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const deleteBlog = async (blogId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/blog/admin/${blogId}`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
