import { Outlet } from "react-router-dom"
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { blue } from "@mui/material/colors";
import AppLayout from "../components/appLayout/AppLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthenticationStatus } from "../services/authService";

const Root = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[900], // Change primary color to orange
      },
      secondary: {
        main: '#673ab7', // Change secondary color to purple
      },
    },
  });
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthenticationStatus());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
        <AppLayout/>
        <Outlet/>
    </ThemeProvider>
  )
}
export default Root