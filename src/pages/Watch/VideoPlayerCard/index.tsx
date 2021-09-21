import { Avatar, Card, CardContent, CardHeader, CardMedia, Divider, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";

import useStyles from "./style";

export type VideoPlayerCardProps = {
  title: string | undefined;
  description: string | undefined;
  views: number | undefined;
  ownerName: string | undefined;
  date: Date | undefined;
  fetcher: () => Promise<string | undefined>;
};

export const VideoPlayerCard = ({
  title,
  description,
  views,
  ownerName,
  date,
  fetcher,
}: VideoPlayerCardProps) => {
  const styles = useStyles();

  // 動画のダウンロードリンクを格納するためのステート
  const[src, setSrc] = useState<string>();
  useEffect(() => {
    // firebase storageから動画のDLリンクを取得する
    fetcher().then(setSrc);
  })

  return (
    <Card className={styles.transparent} elevation={0} square>
      {/*　CardMediaは、画像の他に動画,音声などのメディア系コンポーネントの作成も可能。メディアの指定は、`component`というプロパティに`img`,`video`,`audio`などのHTMLタグを指定するだけ。　*/}
      <CardMedia component="video" controls src={src} />

      <CardContent className={styles.paddingHorizontalLess}>
        {/*
          `Typography`コンポーネントで、テキストコンポーネントを簡単に作ることが可能。今回、componentには`h2`を、`variant`には`h6`を指定している。
          これは、HTMLタグは`<h2>`を使い、スタイリングはMaterial-UIで用意されているh6用のスタイルを使うよう指定。<h2>タグ使いたいけど、フォントサイズなどはh6でのサイズを使いたい場合などに便利。
        */}
        <Typography component="h2" variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">{views} 回視聴・{date? new Date(date).toLocaleDateString() : ''}</Typography>
      </CardContent>

      <Divider />

      <CardHeader
        className={styles.paddingHorizontalLess}
        avatar={<Avatar />}
        title={ownerName}
        subheader="0 subscribers"
      />

      <CardContent className={styles.descPadding}>{description}</CardContent>
    </Card>
  );
};