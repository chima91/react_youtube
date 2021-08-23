import { Button } from "@material-ui/core";
import { useRef } from "react";

export const VideoSelect = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  }
  return (
    <div>
      {/*
        <input>タグをボタンの上に配置する。
        今回は、<Button>をクリックしたらファイルを選択する使用にしたいので、<input type="file"/>という形で、インプットのタイプに'file'を指定します。
        また、デザインを見て頂くと、<input>の表示はされていません。
        このデザインにするために、<input type="file" hidden />とすることで<input>タグを非表示にしています。
      */}
      <input type="file" hidden ref={inputRef} />
      <Button variant="contained" color="primary" onClick={handleClick}>
        ファイルを選択
      </Button>
    </div>
  );
};