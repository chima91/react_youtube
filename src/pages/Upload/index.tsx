import { Dialog, DialogTitle, DialogContent, Divider, Grid, CircularProgress } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import { useEffect } from "react";

import { VideoSelect } from "./VideoSelector";
import { UploadForm } from "./UploadForm";
import useStyles from "./style";
import { AccountLoaded } from "../../stores/AccountLoaded";
import { GlobalUser } from "../../stores/User";

export const Upload = () => {
  const styles = useStyles();

  // recoilの値を使用
  const accountLoaded = useRecoilValue(AccountLoaded);
  const user = useRecoilValue(GlobalUser);

  // react routerを使用
  const navigate = useNavigate();

  // アカウントが読み込まれていない、未ログインであれば、/login へリダイレクト
  useEffect(() => {
    if(accountLoaded) {
      if(!user?.id) {
        navigate("/login");
      }
    }
  }, [accountLoaded, user?.id]);

  return (
    <Dialog fullWidth={true} maxWidth="md" open={true}>
      {/* タイトル用コンポーネント */}
      <DialogTitle>動画のアップロード</DialogTitle>
      {/* 横線コンポーネント（orientation="vertical" で縦線となる） */}
      <Divider />

      {/* コンテント用コンポーネント */}
      <DialogContent className={styles.body}>
        {/* アカウントが存在すれば、アップロードコンポーネントを表示 */}
        {user?.id ? (
          <Grid container spacing={4}>
            <Grid xs item>
              <VideoSelect />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs item>
              <UploadForm />
            </Grid>
          </Grid>
        ) : (
          // ローディングコンポーネントを表示
          <Grid container justifyContent="center">
            <CircularProgress size={50} />
          </Grid>
        )
        }
      </DialogContent>
    </Dialog>
  );
};