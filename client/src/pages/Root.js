import { Outlet } from "react-router-dom"
import AppLayout from "../components/appLayout/AppLayout";
import { MainGrid } from "../components/main/MainStyles";

const Root = () => {
    return (
      <AppLayout>
        <Outlet/>
      </AppLayout>
    )
}

export default Root;