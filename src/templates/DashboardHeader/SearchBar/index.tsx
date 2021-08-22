import { InputBase, Paper } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

import useStyles from "./style";

export const SearchBar = () => {
  const styles = useStyles();

  return(
    // variant: 枠線を表示, elevation: 影を削除
    <Paper className={styles.root} elevation={0} variant="outlined">
      <InputBase className={styles.input} placeholder="検索" />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
    </Paper>
  )
}