import React, { useState } from "react";
import logo from "../../assets/images/logo .png";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { AppBar, Toolbar, styled, Box, Breadcrumbs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LOGOUT } from "../../utils/actions";
import { logoutUser } from "../../apiCalls/auth";
import { confirmToast, messageToast } from "../../utils/toast";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const auth = useSelector((state) => state?.auth);
  window.onclick = function (e) {
    if (!e.target.classList.contains("dropdown")) {
      return setOpenDropdown(false);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleLogoutClick = async (e) => {
    const result = await confirmToast(
      null,
      "You are logging yourself out!,",
      null,
      "Logout!"
    );
    if (result) {
      try {
        const response = await logoutUser();
        if (response.status != 200) {
          return messageToast(
            "error",
            response.data.message || "Cannot Logout!!!"
          );
        }
        localStorage.removeItem("auth-token");
        dispatch({
          type: LOGOUT,
          payload: { isAuthenticated: false, authenticatedUser: {} },
        });
        messageToast("success", "You are successfully logged out!!!");
        navigate("/");
      } catch (err) {
        messageToast("error", err.message || "Cannot Logout!!!");
      }
    }
  };
  const handleDropdown = (e) => {
    setOpenDropdown(!openDropdown);
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
              className="h-[50px] w-[50px] rounded-full "
            />
          </a>
        </div>
        {/* <Breadcrumbs aria-label="breadcrumb">
          <p className="text-gray-100 text-lg font-light">{`dashboard / ${
            location.pathname == "/"
              ? "overview"
              : location.pathname.split("/").join("  ")
          }`}</p>
        </Breadcrumbs> */}

        {/* actions */}

        <div className="dropdown ml-3 relative">
          <div className="dropdown">
            <button
              onClick={handleDropdown}
              className="dropdown flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
              id="user-menu"
              aria-label="User menu"
              aria-haspopup="true">
              <img
                className="dropdown h-8 w-8 rounded-full"
                src={
                  auth?.authenticatedUser?.image?.filePath
                    ? `http://localhost:4000${auth?.authenticatedUser?.image?.filePath}/${auth?.authenticatedUser?.image?.fileName}`
                    : `https://ui-avatars.com/api/?length=1&rounded=true&background=random&name=${auth?.authenticatedUser?.username}`
                }
                alt="admin"
              />
            </button>
          </div>

          <div
            className={`dropdown ${
              openDropdown ? "block" : "invisible"
            } dropdown transition-all block origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-[10000]`}>
            <div
              className="dropdown rounded-md bg-white shadow-xs  "
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu">
              <a
                onClick={handleProfileClick}
                className=" cursor-pointer flex items-center gap-[0.4rem]  px-4 py-3 text-sm leading-5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out  border-b"
                role="menuitem">
                <CgProfile className=" text-lg" />
                Profile
              </a>
              {/* <a
                href="#"
                className="block px-4 py-3 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out  border-b"
                role="menuitem">
                Settings
              </a> */}
              <a
                onClick={handleLogoutClick}
                href="#"
                className="flex items-center gap-[0.5rem]  px-4 py-3 text-sm leading-5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out "
                role="menuitem">
                <AiOutlineLogout className="text-lg" />
                Logout
              </a>
            </div>
          </div>
        </div>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
