import { Button, TextField, Typography } from "@material-ui/core";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { useEffect, useRef, useState } from "react";

import useStyles from "./style";
import { GlobalUser } from "../../../stores/User";
import { useVideoUpload } from "../../../hooks/VideoUpload";

export type UploadFormProps = {
  videoFile: File | undefined;
  thumbFile: File | undefined;
}

export const UploadForm = ({ videoFile, thumbFile }: UploadFormProps) => {
  const styles = useStyles();

  const navigate = useNavigate();

  // videoをアップロードする際の、ownerIdのためのuserId
  const user = useRecoilValue(GlobalUser);

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // エラーを表示するためのステート
  const [ errorMessage, setErrorMessage ] = useState<Error>();

  // 動画をアップロードするためのhooks
  const { upload, loading, error: uploadError } = useVideoUpload();

  // 「アップロード」ボタンをクリックしたら実行する関数
  const submit = () => {
    setErrorMessage(undefined);

    if(!user?.id) return setErrorMessage(new Error("ログインしていません!!!!"));
    if(!videoFile || !thumbFile) return setErrorMessage(new Error("ファイルを選択してください!!!!"));
    if(!titleRef.current?.value) setErrorMessage(new Error("タイトルを入力してください!!!!"));

    upload({
      file: {
        video: videoFile,
        thumbnail: thumbFile
      },
      title: titleRef.current!.value,
      description: descRef.current?.value,
      ownerId: user.id
    }).then(data => {
      if(data?.id) navigate("/");
    });
  };

  // hooksからのエラーを受け取り、画面表示用のエラーステートに渡す。
  useEffect(() => {
    setErrorMessage(uploadError);
  }, [uploadError]);

  return (
    <>
      <label className={styles.label}>
        <Typography variant="body2">タイトル</Typography>
        <TextField size="small" fullWidth variant="outlined" inputRef={titleRef} />
      </label>

      <label className={styles.label}>
        <Typography variant="body2">説明</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          inputRef={descRef}
        />
      </label>

      {errorMessage?.message && (
        <label className={styles.label}>
          <Typography align="center" color="error">
            {errorMessage?.message}
          </Typography>
        </label>
      )}

      <div className={styles.button}>
        <Button variant="contained" color="primary" disabled={loading} onClick={submit}>
          {loading ? "Now Uploading..." : "動画をアップロード"}
        </Button>
      </div>
    </>
  );
};