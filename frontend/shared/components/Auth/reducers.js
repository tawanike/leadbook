import * as types from './types';

let initialState = {
  isLoggedIn: false,
  is_activated: false,
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USER_SIGN_IN:
      state = Object.assign({}, state, { isLoggedIn: action.payload });
    break;
    case types.USER_ACCOUNT_ACTIVATION_ERROR:
      state = Object.assign({}, state, { error: true });
    break;
    default:
      return state
  }
  return state;
}
