import favourites from './favourites';
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    favourites()
  ])
}
