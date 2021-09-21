import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";

import { VideoCard } from "../../components/VideoCard";
import { storage } from "../../utils/Firebase/config";
import { useVideosQuery } from "../../utils/graphql/generated";

export const Home = () => {
  // videoを取得するquery
  const { data, error } = useVideosQuery();

  // エラーがあればコンソールに表示
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      {/* 全部を囲む<Grid container>の中にそれぞれの横並び要素の<Grid item>があるイメージ*/}
      <Grid container spacing={2}>
        {/* queryで取得した動画データを表示する */}
        {data?.videos.map(video => (
          <Grid item xs={12} md={6} lg={3}>
            {/* VideoCard をクリックしたらプレイヤー画面を表示する。 */}
            <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
              <VideoCard
                title={video.title}
                owner={video.owner?.name || ''}
                views={video.views}
                created={video.created_at}
                // <VideoCard>で非同期的に画像を取得するための関数
                fetcher={() => storage.ref(video.thumbnail_url).getDownloadURL()}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
};