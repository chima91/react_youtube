import { Outlet } from "react-router-dom"

import { DashboardHeader } from "../../templates/DashboardHeader"
import useStyles from "./style";

export const SideLessHomeLayout = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <DashboardHeader />
      <div className={styles.main}><Outlet /></div>
    </div>
  )
}