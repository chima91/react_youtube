import useStyles from "./style";

export const Logo = () => {
  const styles = useStyles();

  return <img className={styles.root} src="/static/yt_logo_rgb_light.png" alt="Youtube Logo" />
};