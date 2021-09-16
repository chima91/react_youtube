import { CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { RecoilRoot } from 'recoil';

import { RootRouter } from './Route';
import GlobalStyle from './GlobalStyle';
import { AuthStateListener } from './providers/AuthStateListener';

const theme = createTheme();

// GraphQl APIのエンドポイントを指定する
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_END_POINT_ORIGIN,
});

// GraphQLのリクエストを送信する際に付与するRequest Headerなどをここで指定する
const authLink = setContext(async () => {
  return {
    headers: {
      "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET_KEY,
    }
  }
});

// Apollo Clientのインスタンスをここで作成
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <AuthStateListener>
            <BrowserRouter>
              <CssBaseline />
              <GlobalStyle />
              <RootRouter />
            </BrowserRouter>
          </AuthStateListener>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
