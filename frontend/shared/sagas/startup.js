import axios from 'axios';
import globals from '../globals';
const jwtDecode = require('jwt-decode');
import { setUserSignedIn } from '../components/Auth/actions';
import * as alertsActions from '../components/Alerts/actions';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { history } from '../store';

const getRouter = (state) =>  state.router;


export default function* startup() {
  yield takeLatest('APPLICATION_MOUNTED', handleStartup);
}

function getUser() {
  if(window.localStorage.getItem('token')){
    const api = (process.env.NODE_ENV === 'production') ? globals.api : globals.apiDev;

    const user = jwtDecode(window.localStorage.getItem('token'));
    return axios({
      method: 'get',
      url: `${api}users/${user.user_id}`,
    });
  }
}

function* handleStartup() {
  try {
    const response = yield call(getUser);
    if (response) {
      // dispatch a success action to the store
      // List of protected pages
      const pages = ['/accounts/login', '/accounts/signin', '/accounts/signup', '/', ''];
      // If user is not logged in and lands on any page listed in pages array
      // redirect the user to the log in page

      const router = yield select(getRouter);
      if(pages.includes(router.location.pathname)){
        yield put(alertsActions.toggle('You are already logged in.', 'warning'))
        history.push('/search');
      }

      yield put(setUserSignedIn(response.data));
    } else {
      // List of protected pages
      const pages = ['/search'];
      // If user is not logged in and lands on any page listed in pages array
      // redirect the user to the log in page

      const router = yield select(getRouter);
      if(pages.includes(router.location.pathname)){
        history.push('/accounts/login')
      }
    }
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "GET_USER_PROFILE_FAILURE", error });
  }
}
