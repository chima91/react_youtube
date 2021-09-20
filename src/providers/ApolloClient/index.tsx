import { ApolloProvider as Provider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { PropsWithChildren } from "react";

import { fireAuth } from "../../utils/Firebase/config";

// GraphQL APIのエンドポイントを指定する
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_END_POINT_ORIGIN
});

// GraphQLのリクエストを送信する際に付与するRequest Headerなどをここで指定する
// setContext：ApolloLinkを生成。serverにリクエストを送信する前に、リクエストを改造できるやつ（ざっくり）
// headers：HTTPリクエストのヘッダー。ヘッダーはリクエストに情報を付与できるデータ
// Authorization：HTTP認証要求ヘッダー。HTTPヘッダーの中で、認証情報を格納するためのプロパティ。
// Bearerトークン：OAuth2.0の認可機構。認証情報がどのような形で送られてくるかを明示するための規格。
const authLink = setContext(async() => {
  const token = await fireAuth.currentUser?.getIdToken(true);

  // Bearerトークンでトークンを送信する
  // headersのプロパティは`Authorization`
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return { headers }
});

// ApolloClientのインスタンスをここで作成
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const ApolloProvider = ({ children }: PropsWithChildren<{}>) => {
  return <Provider client={apolloClient}>{children}</Provider>
}