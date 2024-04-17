import { Outlet } from "react-router-dom"
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { blue, green } from "@mui/material/colors";
import AppLayout from "../components/appLayout/AppLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthenticationStatus } from "../services/authService";
import { Main } from "../components/main/MainStyles";

const Root = () => {


  return (
    <>
        <AppLayout/>
        <Main>
          <Outlet/>
        </Main>
    </>
  )
}
export default Root