import { Outlet } from "react-router-dom"
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { blue, green } from "@mui/material/colors";
import AppLayout from "../components/appLayout/AppLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthenticationStatus } from "../services/authService";

const Root = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#e8e8ff',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#000000',
        dark: '#ba000d',
        contrastText: '#000',
      },
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
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