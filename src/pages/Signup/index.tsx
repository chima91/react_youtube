import { Button, Card, TextField, Typography } from "@material-ui/core";

import { Logo } from "../../components/Logo";
import { useSignup } from "../../hooks/Authentication/useSignup";
import useStyles from "./style";

export const Signup = () => {
  const styles = useStyles();
  const { ref, error, loading, signup } = useSignup();

  return (
    <Card className={styles.root} variant="outlined">

      <div className={`${styles.logo} ${styles.margin}`}>
        <Logo />
      </div>

      <Typography className={styles.margin} component="h1" variant="h5">
        新規アカウント登録
      </Typography>

      {/* エラーメッセージを表示。ErrorをMapで管理しているので、簡単にエラーがあるかどうかを確認できる */}
      {error.has("main") && (
        <Typography className={styles.margin} color="error">
          {error.get("main")}
        </Typography>
      )}

      {/* 名前フィールド */}
      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>名前</Typography>
        <TextField
          required
          size="small"
          fullWidth
          variant="outlined"
          // useRefで作成したnameRefを渡してフォームの値を取得する
          inputRef={ref.nameRef}
          // エラーがあれば、フォームのデザインをerror用に変更させる
          error={error.has("name")}
          // エラーの詳細をフォーム下部に表示する
          helperText={error.has("name") ? error.get("name") : ""}
        />
      </label>

      {/* メールアドレスフィールド */}
      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>メールアドレス</Typography>
        <TextField
          type="email"
          required
          size="small"
          fullWidth
          variant="outlined"
          // useRefで作成したemailRefを渡してフォームの値を取得する。
          inputRef={ref.emailRef}
          // エラーがあれば、フォームのデザインをerror用に変更させる
          error={error.has("email")}
          // エラーの詳細のフォームの下部に表示する
          helperText={error.has("email") ? error.get("email") : ""}
        />
      </label>

      {/* パスワードフィールド */}
      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>パスワード</Typography>
        <TextField
          type="password"
          required
          size="small"
          fullWidth
          variant="outlined"
          // useRefで作成したpasswordRefを渡してフォームの値を取得する。
          inputRef={ref.passwordRef}
          // エラーがあれば、フォームのデザインをerror用に変更させる
          error={error.has("password")}
          // エラーの詳細のフォームの下部に表示する
          helperText={error.has("password") ? error.get("password") : ""}
        />
      </label>

      {/* Submitボタン */}
      <div className={styles.margin}>
        <Button
          variant="contained"
          color="primary"
          // ローディング中はボタンを押せないようにする
          disabled={loading}
          onClick={signup}
        >
          {loading ? "アカウント作成中" : "新規作成"}
        </Button>
      </div>

      <div>
        <Button href="/login" color="primary">
          ログインはこちら
        </Button>
      </div>
    </Card>
  );
};