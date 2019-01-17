import * as types from './types';

let initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_FAVOURITES_SUCCESS:
      state = Object.assign({}, state, action.payload);
    break;
    case types.GET_USER_FAVOURITES_FAILURE:
      state = Object.assign({}, state, action.payload);
    break;
    case types.FOLLOW_COMPANY:
      state = Object.assign({}, state, action.payload);
    break;
    case types.UNFOLLOW_COMPANY:
      state = Object.assign({}, state, action.payload);
    break;
    default:
      return state
  }
  return state;
}
