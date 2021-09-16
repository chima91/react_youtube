import { PropsWithChildren, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AccountLoaded } from "../../stores/AccountLoaded";
import { AuthCredential } from "../../stores/AuthCredential";
import { AuthCredentialLoaded } from "../../stores/AuthCredentialLoaded";
import { GlobalUser } from "../../stores/User";
import { useUserByIdLazyQuery } from "../../utils/graphql/generated";

export const GlobalAccount = ({ children }: PropsWithChildren<{}>) => {
  // ユーザ情報取得用のQuery関数
  const [
    userQuery,
    { data: apolloData, error: apolloError, loading: apolloLoading }
  ] = useUserByIdLazyQuery();

  // Recoilのユーザ情報の「Atom」とAuthenticationの「Atom」
  const [globalUser, setGlobalUser] = useRecoilState(GlobalUser);
  const credential = useRecoilValue(AuthCredential);
  const authLoaded = useRecoilValue(AuthCredentialLoaded);

  // Accountのローディング状態を管理
  const setAccountLoaded = useSetRecoilState(AccountLoaded);

  useEffect(() => {
    // Authenticationのローディングが終わっており、
    if(authLoaded) {
      // credentialにIDが格納されており、
      if(credential) {
        // Apollo Clientがローディング中でユーザ情報を未取得であれば
        if(!apolloLoading && !globalUser?.id) {
          // ユーザ情報の取得開始
          setAccountLoaded(false);
          userQuery({ variables: { id: credential } });
        }
      } else {
        if(globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
    }
  }, [credential, authLoaded]);

  useEffect(() => {
    // onAuthStateChangedのロードが終了したタイミングで、ユーザ情報を取れていればRecoilを更新し、取れていなければRecoilをundefinedにする
    if(authLoaded && !apolloLoading) {
      if(apolloData?.users_by_pk?.id) {
        setGlobalUser(apolloData.users_by_pk);
      } else {
        if(globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
      // Accountのローディングを完了
      setAccountLoaded(true);
    }
  }, [authLoaded, apolloData]);

  useEffect(() => {
    // GraphQLからのエラーがあった場合は、Recoilをundefinedで更新し、ユーザにログアウトさせる
    if(apolloError?.message) {
      console.error(apolloError?.message);
      setGlobalUser(undefined);
    }
  }, [apolloError]);

  return <>{children}</>
}