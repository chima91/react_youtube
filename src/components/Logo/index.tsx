import { Link } from "react-router-dom";

import useStyles from "./style";

export const Logo = () => {
  const styles = useStyles();

  return (
    <Link to="/">
      <img
        className={styles.root}
        src="/logo512.png"
        alt="ロゴ"
      />
    </Link>
  )
};