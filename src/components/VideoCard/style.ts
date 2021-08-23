import { makeStyles } from "@material-ui/core";

export default makeStyles({
  // カードの最大サイズを指定。
  // 背景色を除去
  root: {
    maxWidth: 360,
    backgroundColor: "transparent",
  },

  // 16:9の解像度のサムネイル画像を表示させる。
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  // 背景色と両サイドのpadding を削除。
  // また、ユーザーのサムネイルの位置を上端に合わせる。
  header: {
    alignItems: "start",
    backgroundColor: "transparent",
    paddingLeft: 0,
    paddingRight: 0,
  },
});