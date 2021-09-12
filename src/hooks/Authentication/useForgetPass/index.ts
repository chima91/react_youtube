import { useRef, useState } from "react";

import { SetErrorFn, useAuthHelper } from "../useAuthHelper";
import { forgetPass } from "../../../utils/Firebase/forgetPass";

export const useForgetPass = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const [sendSuccess, setSendSuccess] = useState(false);

  const formValidation = (setError: SetErrorFn) => {
    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください!!!!");
      return true;
    }

    return false;
  };

  const sendEmail = async() => {
    await forgetPass(emailRef.current?.value || "");
    setSendSuccess(true);
  };

  const { authExecute, error, loading } = useAuthHelper(
    sendEmail,
    formValidation
  );

  return {
    ref: {
      emailRef,
    },
    loading,
    error,
    sendEmail: authExecute,
    sendSuccess,
  };
};