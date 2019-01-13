import * as types from './types';

let initialState = {
  isLoggedIn: false,
  sessions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USER_SIGN_IN:
      state = Object.assign({}, state, { isLoggedIn: action.payload });
    break;
    case types.GET_PLAYLISTS:
      state = Object.assign({}, state, { sessions: action.payload });
    break;
    default:
      return state
  }
  return state;
}
