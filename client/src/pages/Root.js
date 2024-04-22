import { Outlet } from "react-router-dom"
import AppLayout from "../components/appLayout/AppLayout";
import { MainGrid } from "../components/main/MainStyles";
import FilterDropdowns from "../components/filterOptions/FilterDropdowns";

const Root = () => {


  return (
    <>
        <AppLayout/>
        <FilterDropdowns />
        <MainGrid>
          <Outlet/>
        </MainGrid>
    </>
  )
}
export default Root