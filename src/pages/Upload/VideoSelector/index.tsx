import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import { ChangeEvent, useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

import useStyles from "./style";

// VideoSelectorコンポーネントのプロップスとして、引数を型定義する
export type VideoSelectProps = {
  videoFile: File | undefined;
  setVideoFile: Dispatch<SetStateAction<File | undefined>>;
  setThumbFile: Dispatch<SetStateAction<File | undefined>>;
}

export const VideoSelect = ({
  videoFile,
  setVideoFile,
  setThumbFile
}: VideoSelectProps) => {
  const styles = useStyles();

  // サムネイルの画像URLを格納する配列state
  const [thumbnailURLs, setThumbnailURLs] = useState<string[]>([]);
  // 選択中のサムネイルの画像URLを格納するstate
  const [selectThumbURL, setSelectThumbURL] = useState<string>();
  // サムネイルを生成する関数
  const createThumbnail = (videoRefURL: string) => {
    // サムネイル生成のための準備 (canvasタグを使って、<video>のビューを転写する)
    // 詳しくは：https://shanabrian.com/web/javascript/canvas-image.php
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    // <video>の動画の読み込みが終わったら、<canvas>に<video>と同じサイズにリサイズ
    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 0;
    }
    // video.currentTime が変更されるたびに呼び出される関数(onseeked)を指定する
    // video.currentTime の時のvideoのビュー表示を<canvas>に転写して画像を生成。video.currentTime が動画の最後になるまで繰り返す
    video.onseeked = () => {
      if (video.currentTime >= video.duration || !context) return;

      //  <video>のビューを<canvas>に転写
      context.drawImage(video, 0, 0);

      // 配列のstateを更新する。prevは変更前のstateの値で、変更前のstateの値を保ちつつ、新しい値を配列に挿入している。
      // 詳しくは：https://zenn.dev/gunners6518/articles/4c06488cfa402e
      setThumbnailURLs((prev) => [...prev, canvas.toDataURL("image/jpeg")]);
      video.currentTime += Math.ceil(video.duration / 3);
    };

    // 動画の読み込み
    video.src = videoRefURL;
    video.load();
  }

  const selectedThumb = (url: string) => {
    // サムネイルを選択 → 参照URLを`selectThumbURL`に格納
    setSelectThumbURL(url);
    // 参照URLから画像ファイルを生成し、`setThumbFile`でファイルを親コンポーネントに渡す。
    fetch(url)
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const thumb = new File([blob], "thumb.jpg");
        setThumbFile(thumb);
      })
  };

  const [videoURL, setVideoURL] = useState<string>();

  const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.currentTarget.files?.length) {
      setVideoFile(event.currentTarget.files[0]);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  useEffect(() => {
    if(videoFile) {
      // URL.createObjectURLは、ファイルを引数に受け取り、<video>タグで読み込み可能なローカルURLを生成する。これで生成されたURLを<video>のsrcにわたすことでファイルを動画で表示できる。
      const videoURL = URL.createObjectURL(videoFile);
      setVideoURL(videoURL);
      createThumbnail(videoURL);
    }
  }, [videoFile]);

  // サムネイルが生成されたら最初のサムネイルを必ず選択にし、選択なしに動画がアップロードされることを防ぐ。
  useEffect(() => {
    if(thumbnailURLs.length && thumbnailURLs[0] !== selectThumbURL) {
      selectedThumb(thumbnailURLs[0]);
    }
  }, [thumbnailURLs]);

  return (
    <div className={styles.root}>
      {videoURL && (
        <div className={styles.full}>
          <CardMedia component="video" controls src={videoURL} />
          <Typography className={styles.textPadding}>サムネイル</Typography>
          <Grid container className={styles.thumbnailContent} spacing={2}>
            {thumbnailURLs.map(url => {
              return (
                <Grid item xs={4}>
                  <CardMedia
                    className={`${styles.thumbnail} ${url === selectThumbURL ? styles.selectedThumb : ""}`}
                    image={url}
                    onClick={() => selectedThumb(url)}
                  />
                </Grid>
              )
            })}
          </Grid>
        </div>
      )}

      <input type="file" hidden ref={inputRef} onChange={selectedFile} />
      {!videoURL && <Button variant="contained" color="primary" onClick={handleClick}>ファイルを選択</Button>}
    </div>
  );
};