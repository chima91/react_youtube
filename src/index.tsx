import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RootRouter } from './Route';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <RootRouter />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
