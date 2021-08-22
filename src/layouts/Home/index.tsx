import { Outlet } from "react-router-dom"
import { DashboardHeader } from "../../templates/DashboardHeader"

export const HomeLayout = () => {
  return (
    <div>
      <DashboardHeader />
      <Outlet />
    </div>
  )
}