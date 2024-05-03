import { Outlet } from "react-router-dom"
import AppLayout from "../components/appLayout/AppLayout";

const Root = () => {
  return (
    // AppLayout is where the drawer with the header is rendered.
    <AppLayout>
      {/* All of the main content.. i.e tasks and filter dropdowns are rendered */}
      <Outlet/>
    </AppLayout>
  )
}

export default Root;