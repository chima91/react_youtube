import { Container, Grid } from "@material-ui/core";
import { useParams } from "react-router";

import { VideoPlayerCard } from "./VideoPlayerCard";
import useStyles from "./style";
import { VideoHorizontalCard } from "../../components/VideoHorizontalCard";
import { useRecommendVideosQuery, useVideoByPkQuery } from "../../utils/graphql/generated";
import { storage } from "../../utils/Firebase/config";
import { Link } from "react-router-dom";

export const Watch = () => {
  const styles = useStyles();

  // URLから再生する動画のIDを取得する
  const { videoId } = useParams();

  // 再生する動画を取得する
  const { data: currentVideo } = useVideoByPkQuery({
    variables: {
      id: videoId
    }
  });

  // なんちゃってレコメンドの動画を取得する
  const { data: recommendVideos } = useRecommendVideosQuery({
    variables: {
      currentVideoId: videoId
    }
  });

  return (
    <Container className={styles.root}>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <VideoPlayerCard
            title={currentVideo?.videos_by_pk?.title}
            description={currentVideo?.videos_by_pk?.description}
            views={currentVideo?.videos_by_pk?.views}
            ownerName={currentVideo?.videos_by_pk?.owner?.name}
            date={currentVideo?.videos_by_pk?.created_at}
            fetcher={async () => {
              if(currentVideo?.videos_by_pk?.video_url) {
                return storage
                  .ref(currentVideo.videos_by_pk.video_url)
                  .getDownloadURL();
              }
              return undefined;
            }}
          />
        </Grid>
        <Grid item xs={4}>
        {recommendVideos?.videos.map(video => (
          <div className={styles.cardPadding}>
            <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
              <VideoHorizontalCard
                title={video.title}
                views={video.views}
                owner={video.owner?.name || ""}
                created={video.created_at}
                fetcher={() => storage.ref(video.thumbnail_url).getDownloadURL()}
              />
            </Link>
          </div>
        ))}
        </Grid>
      </Grid>
    </Container>
  );
};