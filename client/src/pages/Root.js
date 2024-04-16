import { Outlet } from "react-router-dom"
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { blue, green } from "@mui/material/colors";
import AppLayout from "../components/appLayout/AppLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthenticationStatus } from "../services/authService";

const Root = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthenticationStatus());
  }, [dispatch]);

  return (
    <>
        <AppLayout/>
        <Outlet/>
    </>
  )
}
export default Root