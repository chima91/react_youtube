import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { RootRouter } from './Route';
import GlobalStyle from './GlobalStyle';
import { AuthStateListener } from './providers/AuthStateListener';
import { GlobalAccount } from './providers/GlobalAccount';
import { ApolloProvider } from './providers/ApolloClient';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ApolloProvider>
          <AuthStateListener>
            <GlobalAccount>
              <BrowserRouter>
                <CssBaseline />
                <GlobalStyle />
                <RootRouter />
              </BrowserRouter>
            </GlobalAccount>
          </AuthStateListener>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
