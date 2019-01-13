import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import App from '../shared/App';
import store, { history } from '../shared/store';

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('app'));
