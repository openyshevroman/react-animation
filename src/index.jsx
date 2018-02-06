import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles.less';
import './animation.less';

import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ),
    document.getElementById('root'),
  );
});
