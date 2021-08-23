import { Container, Grid } from "@material-ui/core";
import { VideoCard } from "../../components/VideoCard";

export const Home = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        {/*
          横並びにしたいコンポーネントを全てを囲むように<Grid>を配置
          このGridには"container"というプロパティを指定する
          containerの指定がない場合、他のコードが合っていても横並び表示はされない。

          横並びにしたいコンポーネントの一つ一つを<Grid>で囲む
          こちらのGridでは、itemプロパティを指定する。
          全部を囲む<Grid container>の中にそれぞれの横並び要素の<Grid item>があるイメージ
        */}
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
        <Grid item xs={4}>
          <VideoCard />
        </Grid>
      </Grid>
    </Container>
  )
};