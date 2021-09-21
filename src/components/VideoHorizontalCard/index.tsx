import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { useEffect, useState } from "react";

import { HeaderTitle, HeaderTitleProps } from "../VideoCard/HeaderTitle";
import { SubHeaderContent, SubHeaderContentProps } from "../VideoCard/SubHeaderContent";
import useStyles from "./style";

// 親コンポーネントから渡されるpropsの型。インターセクション型による型定義
export type VideoHorizontalCardProps = {
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps & SubHeaderContentProps;

export const VideoHorizontalCard = ({title, owner, views, created, fetcher}: VideoHorizontalCardProps) => {
  const styles = useStyles();

  // サムネイルのダウンロードリンクのステート
  const [src, setSrc] = useState<string>();
  useEffect(() => {
    // サムネのダウンロードリンクを取得する関数
    fetcher().then(setSrc);
  })

  return (
    // 複数のスタイルを適用したい場合、${}`という記法を用いることで、変数の値を文字として展開する
    // elevation={0}: box-shadowの影を削除する。square: border-radiusを削除する
    <Card className={`${styles.root} ${styles.transparent}`} elevation={0} square>
      <div className={styles.thumbnail}>
        <CardMedia className={styles.media} image={src} title="Thumbnail" />
      </div>

      <CardHeader
        className={styles.contentPadding}
        title={<HeaderTitle title={title} />}
        subheader={<SubHeaderContent owner={owner} views={views} created={created} />}
      />
    </Card>
  );
};