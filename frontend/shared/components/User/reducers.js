import * as types from './types';

let initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_PROFILE_SUCCESS:
      state = Object.assign({}, state, action.payload);
    break;
    case types.GET_USER_PROFILE_FAILURE:
      state = Object.assign({}, state, action.payload);
    break;
    default:
      return state
  }
  return state;
}
