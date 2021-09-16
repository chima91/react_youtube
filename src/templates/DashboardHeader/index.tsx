import { AppBar, Avatar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Logo } from "../../components/Logo";
import { GlobalUser } from "../../stores/User";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";

export const DashboardHeader = () => {
  const styles = useStyles();
  const globalUser = useRecoilValue(GlobalUser);

  return(
    // color: 背景を白に, elevation: box-shadowをなくす
    <AppBar elevation={0} color="inherit">
      <Toolbar className={styles.between}>
        <div className={styles.flex}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          {/* useStylesの値は、CSSモジュールと全く同じような使い方で使用できる */}
          <Link to="/" className={styles.logo}>
            <Logo/>
          </Link>
        </div>

        <SearchBar />

        <div className={styles.flex}>
          {globalUser ? (
            <>
              <IconButton>
                <VideoCallIcon />
              </IconButton>
              <IconButton className={styles.profileIcon}>
                <Avatar />
              </IconButton>
            </>
          ) : (
            <Button variant="outlined" color="primary" href="/login">
              ログイン
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}