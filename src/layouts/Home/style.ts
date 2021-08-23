import { makeStyles } from "@material-ui/core";

// 使いまわせるように、`Header`コンポーネントの'height'を定数化
const APP_BAR = 64;

// Sidebarの幅を固定
const SIDEBAR_WIDTH = 240;

export default makeStyles({
  // 横並び
  root: {
    display: "flex",
    minHeight: "100%"
  },
  // サイドバーの上部にAPP_BAR分のpaddingを表示
  sidebar: {
    paddingTop: APP_BAR,
    width: SIDEBAR_WIDTH,
  },
  // メインコンポーネントの上部にAPP_BAR分のpaddingを表示
  main: {
    paddingTop: APP_BAR + 30,
    // 横並び時に、最大まで幅を大きくする
    flexGrow: 1
  },
});