import { Outlet } from "react-router-dom"
import AppLayout from "../components/appLayout/AppLayout";
import { MainGrid } from "../components/main/MainStyles";

const Root = () => {

  return (
    <>
        <AppLayout/>
        <MainGrid>
          <Outlet/>
        </MainGrid>
    </>
  )
}
export default Root