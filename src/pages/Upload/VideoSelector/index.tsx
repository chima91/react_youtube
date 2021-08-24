import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import { ChangeEvent, useState, useEffect, useRef } from "react";

import useStyles from "./style";

export const VideoSelect = () => {
  const styles = useStyles();

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  }

  const [file, setFile] = useState<File>();
  const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.currentTarget.files?.length) {
      setFile(event.currentTarget.files[0]);
    }
  }

  const [videoURL, setVideoURL] = useState<string>();
  // useEffectは、第2引数に指定した変数が変更されたら、第1引数の関数を実行します。
  useEffect(() => {
    if(file) {
      // URL.createObjectURLは、ファイルを引数に受け取り、<video>タグで読み込み可能なローカルURLを生成します。
      // URL.createObjectURLで生成されたURLを<video>のsrcにわたすことでファイルを動画で表示できます。
      // videoURLをsetVideoURLとcreateThumbnailにそれぞれ渡す
      const videoURL = URL.createObjectURL(file);
      setVideoURL(videoURL);
      createThumbnail(videoURL);
    }
  }, [file]);

  // サムネイルの画像URLを格納する配列state
  const [thumbnailURLs, setThumbnailURLs] = useState<string[]>([]);
  // サムネイルを生成する関数
  const createThumbnail = (videoRefURL: string) => {
    // サムネイル生成のための準備 (canvasタグを使って、<video>のビューを転写する)
    // 詳しく知りたい方はhttps://shanabrian.com/web/javascript/canvas-image.php
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
    // video.currentTimeの時のvideoのビュー表示を<canvas>に転写して画像を生成
    // video.currentTime が動画の最後になるまで繰り返す
    video.onseeked = () => {
      if (video.currentTime >= video.duration || !context) return;

      //  <video>のビューを<canvas>に転写
      context.drawImage(video, 0, 0);

      // 配列のstateを更新する。prev: 変更前のstateの値, [...prev,canvas.toDataURL("image/jpeg")]
      // →以前のstateを値を保ちつつ、新しい値を配列に挿入している。イメージとしては、array.append(value)
      // 詳しくは：https://zenn.dev/gunners6518/articles/4c06488cfa402e
      setThumbnailURLs((prev) => [...prev, canvas.toDataURL("image/jpeg")]);
      video.currentTime += Math.ceil(video.duration / 3);
    };

    // 動画の読み込み
    video.src = videoRefURL;
    video.load();
  }

  return (
    <div className={styles.root}>
      {/*
        これは、React流の`if文`です。if(videoURL){<CardMedia />}と同じ意味を成します。
        しかし、JSX内では`if文`が使用できないため、このような特殊な書き方をしています。
        この書き方を使用するときは、この部分の全体を"{}"で囲むことをお忘れなく。
      */}
      {videoURL && (
        <div className={styles.full}>
          <CardMedia component="video" controls src={videoURL} />
          <Typography className={styles.textPadding}>サムネイル</Typography>
          <Grid className={styles.thumbnailContent} container spacing={2}>
            {thumbnailURLs.map(url => {
              return (
                <Grid item xs={4}>
                  <CardMedia image={url} style={{ paddingTop: "56.25%" }} />
                </Grid>
              )
            })}
          </Grid>
        </div>
      )}

      {/*
        <input>タグをボタンの上に配置する。
        今回は、<Button>をクリックしたらファイルを選択する使用にしたいので、<input type="file"/>という形で、インプットのタイプに'file'を指定する。
        <input>を表示しないようにするために、<input type="file" hidden />とすることで<input>タグを非表示にしている。
      */}
      <input type="file" hidden ref={inputRef} onChange={selectedFile} />
      {!videoURL && <Button variant="contained" color="primary" onClick={handleClick}>ファイルを選択</Button>}
    </div>
  );
};