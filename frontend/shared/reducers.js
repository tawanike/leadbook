import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { createBrowserHistory } from 'history';

import alerts from './components/Alerts/reducers';
import auth from './components/Auth/reducers';
import search from './components/Search/reducers';
import user from './components/User/reducers';
import favourites from './components/Favourites/reducers';

const history = createBrowserHistory();

export default combineReducers({
  router: connectRouter(history),
  alerts,
  auth,
  search,
  user,
  favourites
});
