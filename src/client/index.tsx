import * as React from 'react';
import ReactDOM from 'react-dom';
import App from '@/client/app/App';
import { Provider } from 'react-redux';
import store from '@/client/app/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
