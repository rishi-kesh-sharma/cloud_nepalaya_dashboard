import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBlogger } from "react-icons/fa";

const Sidebar = ({ toogleThemeMode, themeMode }) => {
  const location = useLocation();
  console.log(location.pathname);

  let links = [
    {
      // icon: <Home />,
      title: "Overview",
      path: "/",
      isActive: true,
      icon: <AiFillHome />,
    },
    {
      // icon: <AccountBalance />,
      title: "Blogs",
      path: "/blogs",
      isActive: false,
      icon: <FaBlogger />,
    },
  ];

  return (
    <Box
      className="shadow-lg border  border-gray-200"
      sx={{
        display: { xs: "none", sm: "block" },
        width: "16vw",
        maxWidth: "190px",
        height: "100vh",
        maxWidth: "25%",
        position: "fixed",
        paddingTop: "4rem",
        background: "#fafafc",
      }}>
      <Box>
        <ul className="flex flex-col">
          {links.map(({ title, icon, path }, index) => (
            <li key={index} className="border border-b-gray-300">
              <Link
                to={path}
                style={{
                  textDecoration: "none",
                  color: "#316EFF",
                  display: "inline-block",
                  width: "100%",
                }}
                className={`${
                  location.pathname == path && "bg-[#316EFF]"
                } h-full w-full`}>
                <button className="flex gap-3 p-3 items-center justify-start">
                  <span
                    className={`${
                      location.pathname == path && "text-gray-100"
                    }`}>
                    {icon}
                  </span>
                  <span
                    className={`${
                      location.pathname == path && "text-gray-100"
                    }`}>
                    {title}
                  </span>
                </button>
              </Link>
            </li>
          ))}

          {/* THEME MODE TOGGLER */}
          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ justifyContent: "center", gap: 0 }}>
                {themeMode === "dark" ? <ModeNight /> : <LightMode />}
              </ListItemIcon>
              <Switch onChange={toogleThemeMode} sx={{ marginLeft: "-15px" }} />
            </ListItemButton>
          </ListItem> */}
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
