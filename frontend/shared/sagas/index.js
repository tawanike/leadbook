import startup from './startup';
import favourites from './favourites';
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    startup(),
    favourites()
  ])
}
