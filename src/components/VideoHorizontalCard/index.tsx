import { Card, CardHeader, CardMedia } from "@material-ui/core";

import { HeaderTitle } from "../VideoCard/HeaderTitle";
import { SubHeaderContent } from "../VideoCard/SubHeaderContent";
import useStyles from "./style";

export const VideoHorizontalCard = () => {
  const styles = useStyles();

  return (
    // 複数のスタイルを適用したい場合、${}`という記法を用いることで、変数の値を文字として展開する
    // elevation={0} : box-shadowの影を削除する
    // square: border-radiusを削除する
    <Card className={`${styles.root} ${styles.transparent}`} elevation={0} square>
      {/*
        サムネイル用のメディアコンポーネントを作成
      */}
      <div className={styles.thumbnail}>
        <CardMedia className={styles.media} image="/static/no-image.jpg" title="Thumbnail" />
      </div>

      {/*
        `Home`で作成した<HeaderTitle>と<SubHeaderContent>を流用する
      */}
      <CardHeader className={styles.contentPadding} title={<HeaderTitle />} subheader={<SubHeaderContent />} />
    </Card>
  );
};