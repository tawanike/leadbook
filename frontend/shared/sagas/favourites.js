import axios from 'axios';
import globals from '../globals';
const jwtDecode = require('jwt-decode');
import { takeLatest, call, put } from 'redux-saga/effects';
import { getFavouriteCompanies, getUserFavouriteCompanies } from '../components/Favourites/actions';
import * as alertsActions from '../components/Alerts/actions';
import FavouriteService from '../services/favourites';

const favouriteService = new FavouriteService();

export default function* userWatcherSaga() {
  yield takeLatest('GET_USER_PROFILE_SUCCESS', userWorkerSaga);
}

function getUserFavourites() {
  const api = (process.env.NODE_ENV === 'production') ? globals.api : globals.apiDev;
  if(window.localStorage.getItem('token')) {
    const decoded = jwtDecode(window.localStorage.getItem('token'));

    return axios({
      method: 'get',
      url: `${api}favourites/${decoded.user_id}`,
    });
  }
}

function* userWorkerSaga() {
  try {
    const response = yield call(getUserFavourites);
    let companies = [];
    // dispatch a success action to the store with the new dog

    response.data.data.map((company) => {
      companies.push(company.company);
    });

    yield put(getFavouriteCompanies(response.data));
    yield put(getUserFavouriteCompanies(companies));

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "GET_USER_FOLLOWING_FAILURE", error });
  }
}
