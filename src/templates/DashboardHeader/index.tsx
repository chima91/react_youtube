import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Link } from "react-router-dom";

import { Logo } from "../../components/Logo";
import { useUserByIdQuery } from "../../utils/graphql/generated";
import { SearchBar } from "./SearchBar";

import useStyles from "./style";

export const DashboardHeader = () => {
  const styles = useStyles();

  // GraphQLの`query`を発行して、Hasuraのエンドポイントにリクエストを飛ばし、返り値を取得する
  const { data } = useUserByIdQuery({
    variables: { id: "testid" },
  })

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
          <IconButton>
            <Typography>{data?.users_by_pk?.name}</Typography>
          </IconButton>
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