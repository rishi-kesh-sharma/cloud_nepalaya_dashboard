import React, { useState } from "react";
import {
  createTheme,
  Stack,
  Box,
  ThemeProvider,
  Breadcrumbs,
  Typography,
} from "@mui/material";

import Navbar from "../../components/commons/Navbar";
import Sidebar from "../../components/commons/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenValidity } from "../../apiCalls/auth";
import { LOGIN } from "../../utils/actions";
const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await checkTokenValidity();
        if (!response.isValid) {
          dispatch({
            type: LOGIN,
            payload: {
              isAuthenticated: false,
              authenticatedUser: {},
            },
          });
          navigate("/login");
        } else {
          dispatch({
            type: LOGIN,
            payload: {
              isAuthenticated: true,
              authenticatedUser: response?.user,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: LOGIN,
          payload: {
            isAuthenticated: false,
            authenticatedUser: {},
          },
        });
      }
    };
    checkAuthentication();
  }, []);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [mode, setMode] = useState("light");
  const toogleThemeMode = () => setMode(mode === "light" ? "dark" : "light");

  const theme = createTheme({
    palette: {
      mode,
    },
  });
  return (
    <div>
      {isAuthenticated ? (
        <ThemeProvider theme={theme}>
          <Box color={"text.primary"} sx={{ minHeight: "100vh" }}>
            <Navbar />
            <Stack direction="row" gap="1rem" overflow={"hidden"}>
              <Sidebar toogleThemeMode={toogleThemeMode} themeMode={mode} />

              <Outlet />
            </Stack>
          </Box>
        </ThemeProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Page;
