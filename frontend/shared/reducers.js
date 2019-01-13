import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { createBrowserHistory } from 'history';

import auth from './components/Auth/reducers';
import search from './components/Search/reducers';

const history = createBrowserHistory();

export default combineReducers({
  router: connectRouter(history),
  auth,
  search
});
