import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";

import useStyles from "./style";
import { HeaderTitle, HeaderTitleProps } from "./HeaderTitle";
import { SubHeaderContent, SubHeaderContentProps } from "./SubHeaderContent";
import { useEffect, useState } from "react";

// インターセクション型による型定義。子コンポーネントの型定義を使用して、冗長な書き方を防ぐことが可能
export type VideoCardProps = {
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps & SubHeaderContentProps;

export const VideoCard = ({fetcher, title, owner, created, views}: VideoCardProps) => {
  const styles = useStyles();

  const [imageSrc, setImageSrc] = useState<string>();
  useEffect(() => {
    // 関数の実態は、Firebase Storage からサムネ用のダウンロードリンクを取得すること
    // ここでは、関数の内部構成を知ることなく、実行すると Promise<string | undefined>が返される関数であることしか知らない。
    // コンポーネントから画像取得の詳細を隠しつつも、非同期な画像の取得を実現する
    fetcher().then(setImageSrc);
  })

  return (
    // elevation={0} : Cardの影を削除する
    // square : 丸みの除去
    <Card className={styles.root} elevation={0} square>
      <CardMedia
        className={styles.media}
        image={imageSrc || "/static/no-image.jpg"}
        title="Thumbnail"
      />

      <CardHeader
        className={styles.header}
        avatar={<Avatar />}
        title={<HeaderTitle title={title} />}
        subheader={<SubHeaderContent owner={owner} views={views} created={created} />}
      />
    </Card>
  );
};