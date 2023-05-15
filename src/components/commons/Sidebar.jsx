import React from "react";
import {
  AiFillHome,
  AiFillQuestionCircle,
  AiOutlineContacts,
  AiOutlineUser,
} from "react-icons/ai";
import { Box } from "@mui/material";

import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBlogger } from "react-icons/fa";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { MdMiscellaneousServices } from "react-icons/md";
import { ImQuotesLeft } from "react-icons/im";

const Sidebar = ({}) => {
  const location = useLocation();

  let links = [
    {
      title: "Overview",
      path: "/",
      isActive: true,
      icon: <AiFillHome className="text-lg" />,
    },
    {
      title: "Blogs",
      path: "/blog",
      isActive: false,
      icon: <FaBlogger className="text-lg" />,
    },
    {
      title: "FAQ's",
      path: "/faq",
      isActive: false,
      icon: <AiFillQuestionCircle className="text-lg" />,
    },
    {
      title: "Quotes",
      path: "/quote",
      isActive: false,
      icon: <BsFillChatSquareQuoteFill className="text-lg" />,
    },
    {
      title: "Services",
      path: "/service",
      isActive: false,
      icon: <MdMiscellaneousServices className="text-lg" />,
    },
    {
      title: "Testimonials",
      path: "/testimonial",
      isActive: false,
      icon: <ImQuotesLeft className="text-lg" />,
    },
    {
      title: "Contacts",
      path: "/contact",
      isActive: false,
      icon: <AiOutlineContacts className="text-lg" />,
    },
    {
      title: "Users",
      path: "/user",
      isActive: false,
      icon: <AiOutlineUser className="text-lg" />,
    },
  ];

  return (
    <Box
      className="shadow-lg border  border-gray-200 "
      sx={{
        display: { xs: "none", sm: "block" },
        width: "16vw",
        maxWidth: "190px",
        height: "100vh",
        maxWidth: "25%",
        position: "fixed",
        left: "-2px",
        paddingTop: "1.7rem",
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
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
