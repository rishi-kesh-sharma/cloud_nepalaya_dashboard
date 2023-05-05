import React, { useState } from "react";
import logo from "../assets/images/logo .png";
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  Breadcrumbs,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LOGOUT } from "../actions/authActions";
import { logoutUser } from "../apiCalls/auth";
import SearchBar from "./SearchBar";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Actions = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "0.2px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = async (e) => {
    const response = await logoutUser();
    localStorage.removeItem("auth-token");
    dispatch({
      type: LOGOUT,
      payload: { isAuthenticated: false, authenticatedUser: {} },
    });

    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        height: "5rem",
        zIndex: 1,
        background: "#316EFF",
      }}>
      <StyledToolbar className="flex items-center justify-between w-full h-full">
        <div className="flex items-center">
          <a href="/">
            <img
              src={logo}
              alt="logo"
              className="h-[50px] w-[50px] rounded-full"
            />
          </a>
        </div>
        {/* <Typography
          variant="h6"
          sx={{
            display: { xs: "none", sm: "block" },
            marginLeft: "1rem",
          }}>
          Blog App
        </Typography> */}
        {/* <Code sx={{ display: { xs: "block", sm: "none" } }} /> */}
        {/* <Breadcrumbs aria-label="breadcrumb"> */}
        {/* <p className="text-gray-100 text-lg font-light">{`/dashboard${
          location.pathname == "/" ? "/overview" : location.pathname
        }`}</p> */}
        {/* </Breadcrumbs> */}

        {/* actions */}
        <Actions>
          <button
            className="bg-gray-200 text-[#316EFF] px-[0.5rem] py-[0.15rem] rounded "
            onClick={handleLogoutClick}>
            Logout
          </button>
        </Actions>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
