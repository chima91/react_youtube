// firebaseのauthをimport
import { fireAuth } from "./config";

// サインアップに必要な引数の型を定義
// signup()関数では、引数にFireSignupTypeの型、つまり文字型の`email`と`password`が必要
export type FireSignupType = {
  email: string;
  password: string;
};

/**
 * サインアップ処理の実態
 * firebaseのサインアップ処理をラップしているだけ
 * @param {email, password} ログインに必要な値
 * @returns Promise<firebase.auth.UserCredential>
 */
export const signup = ({ email, password }: FireSignupType) =>
  fireAuth.createUserWithEmailAndPassword(email, password);