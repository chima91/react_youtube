import { Button, CardMedia } from "@material-ui/core";
import { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { useRef } from "react";

export const VideoSelect = () => {
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
      setVideoURL(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <div>
      {/*
        これは、React流の`if文`です。
        if(videoURL){<CardMedia />}と同じ意味を成します。
        しかし、JSX内では`if文`が使用できないため、このような特殊な書き方をしています。
        この書き方を使用するときは、この部分の全体を"{}"で囲むことをお忘れなく。
      */}
      {videoURL && <CardMedia component="video" controls src={videoURL} />}

      {/*
        <input>タグをボタンの上に配置する。
        今回は、<Button>をクリックしたらファイルを選択する使用にしたいので、<input type="file"/>という形で、インプットのタイプに'file'を指定します。
        また、デザインを見て頂くと、<input>の表示はされていません。
        このデザインにするために、<input type="file" hidden />とすることで<input>タグを非表示にしています。
      */}
      <input type="file" hidden ref={inputRef} onChange={selectedFile} />
      {file?.name}
      <Button variant="contained" color="primary" onClick={handleClick}>
        ファイルを選択
      </Button>
    </div>
  );
};