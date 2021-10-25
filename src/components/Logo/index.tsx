import { Link } from "react-router-dom";

import useStyles from "./style";

export const Logo = () => {
  const styles = useStyles();

  return (
    <Link to="/">
      <img
        className={styles.root}
        src="/static/yt_logo_rgb_light.png"
        alt="Youtube Logo"
      />
    </Link>
  )
};