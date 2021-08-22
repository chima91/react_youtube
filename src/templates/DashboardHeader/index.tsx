import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Logo } from "../../components/Logo";

import useStyles from "./style";

export const DashboardHeader = () => {
  const styles = useStyles();

  return(
    // color: 背景を白に, elevation: box-shadowをなくす
    <AppBar elevation={0} color="inherit">
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        {/* useStylesの値は、CSSモジュールと全く同じような使い方で使用できる */}
        <div className={styles.logo}>
          <Logo/>
        </div>
      </Toolbar>
    </AppBar>
  )
}