import { ApolloProvider as Provider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { PropsWithChildren } from "react";

// GraphQL APIのエンドポイントを指定する
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_END_POINT_ORIGIN
});

// GraphQLのリクエストを送信する際に付与するRequest Headerなどをここで指定する
const authLink = setContext(() => {
  return {
    headers: {
      "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET_KEY
    }
  }
});

// ApolloClientのインスタンスをここで作成
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const ApolloProvider = ({ children }: PropsWithChildren<{}>) => {
  return <Provider client={apolloClient}>{children}</Provider>
}