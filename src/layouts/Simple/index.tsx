import { Outlet } from "react-router-dom"

export const SimpleLayout = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  )
}