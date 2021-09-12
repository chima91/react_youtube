import { useRef } from "react";
import { useNavigate } from "react-router";

import { SetErrorFn, useAuthHelper } from "../useAuthHelper";
import { login as FireLogin } from "../../../utils/Firebase/login";

export const useLogin = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const formValidation = (setError: SetErrorFn) => {
    let invalidValidation = false;

    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください。");
      invalidValidation = true;
    }

    if (!passwordRef.current?.value) {
      setError("password", "パスワードを入力してください。");
      invalidValidation = true;
    }

    return invalidValidation;
  };

  // 実際のログインのロジック
  const login = async() => {
    const { user } = await FireLogin({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if(!user?.uid) throw new Error("ログインに失敗しました!!!!");

    navigate('/');
  };

  // useAuthHelperを使用して、実際に認証に使用する関数を生成する
  const { authExecute, error, loading } = useAuthHelper(login, formValidation);
  return {
    ref: {
      emailRef,
      passwordRef
    },
    login: authExecute,
    error,
    loading,
  }
}