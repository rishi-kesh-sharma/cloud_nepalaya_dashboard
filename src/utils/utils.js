import { CLIENT_URL } from "../constants/constants";
import axios from "axios";
export const interceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [CLIENT_URL];
      const token = localStorage.getItem("auth-token");
      config.headers["auth-token"] = token;
      // if (allowedOrigins.includes(origin)) {
      // }
      // console.log(config.headers["auth-token"]);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
