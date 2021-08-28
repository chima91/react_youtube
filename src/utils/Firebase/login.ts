import { fireAuth } from "./config";

// ログインに必要な引数の型を定義
// login()関数では、引数にFireLoginTypeの型、つまり文字型の`email`と`password`が必要
export type FireLoginType = {
  email: string;
  password: string;
};

export const login = ({ email, password }: FireLoginType) =>
  fireAuth.signInWithEmailAndPassword(email, password);