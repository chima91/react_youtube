import { Dialog, DialogTitle, DialogContent, Divider, Grid } from "@material-ui/core";

import { VideoSelect } from "./VideoSelector";

export const Upload = () => {
  return (
    <Dialog fullWidth={true} maxWidth="md" open={true}>
      {/* タイトル用コンポーネント */}
      <DialogTitle>動画のアップロード</DialogTitle>
      {/* 横線コンポーネント */}
      <Divider />

      {/* コンテント用コンポーネント */}
      <DialogContent>
        <Grid container spacing={4}>
          <Grid xs item>
            <VideoSelect />
          </Grid>

          {/*
            真ん中に縦線を挿入
            デザインにあるような線を入れるため
          */}
          <Divider orientation="vertical" flexItem />

          <Grid xs item>
            右側
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};