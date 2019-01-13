import { logger } from 'redux-logger';
const jwtDecode = require('jwt-decode');
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import authMiddleware from './middleware/auth';
import createHistory from 'history/createBrowserHistory';
import { compose, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootSaga from './sagas';
import reducers from "./reducers";

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancers = [];
const middleware = [
  routerMiddleware(history),
  thunkMiddleware,
  authMiddleware,
  logger,
  sagaMiddleware
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  connectRouter(history)(reducers),
  initialState,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export default store;
