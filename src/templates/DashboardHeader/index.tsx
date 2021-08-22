import { AppBar, Avatar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall"
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar";

import useStyles from "./style";

export const DashboardHeader = () => {
  const styles = useStyles();

  return(
    // color: 背景を白に, elevation: box-shadowをなくす
    <AppBar elevation={0} color="inherit">
      <Toolbar className={styles.between}>
        <div className={styles.flex}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          {/* useStylesの値は、CSSモジュールと全く同じような使い方で使用できる */}
          <div className={styles.logo}>
            <Logo/>
          </div>
        </div>

        <SearchBar />

        <div className={styles.flex}>
          <IconButton>
            <VideoCallIcon />
          </IconButton>
          <IconButton className={styles.profileIcon}>
            <Avatar />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}