import axios from 'axios';
import globals from '../globals';
const jwtDecode = require('jwt-decode');
import { takeLatest, call, put } from 'redux-saga/effects';

export default function* userWatcherSaga() {
  yield takeLatest("GET_USER_PROFILE", userWorkerSaga);
}

function getUser() {
  const api = (process.env.NODE_ENV === 'production') ? globals.api : globals.apiDev;
  const decoded = jwtDecode(window.localStorage.getItem('token'));
  console.log('GET_USER_PROFILE', 'CALLED_BY_A_SAGA')
  return axios({
    method: 'get',
    url: `${api}/users/${decoded.id} `,
  });
}

function* userWorkerSaga() {
  console.log('userWorkerSaga', 'CALLED_BY_A_SAGA')
  try {
    const response = yield call(getUser);

    // dispatch a success action to the store with the new dog
    yield put({ type: 'GET_USER_PROFILE_SUCCESS', payload: response.data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "GET_USER_PROFILE_FAILURE", error });
  }
}
