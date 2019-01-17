import * as types from './types';

let initialState = {
  following: [],
  profile: {},
  companies: []
};

export default function(state = initialState, action) {
  console.log(state)
  switch (action.type) {
    case types.GET_USER_PROFILE_SUCCESS:
      state = Object.assign({}, state, { profile: action.payload });
    break;
    case types.GET_USER_PROFILE_FAILURE:
      state = Object.assign({}, state, action.payload);
    break;
    case types.GET_USER_FAVOURITES:
      state = Object.assign({}, state, { following: action.payload });
    break;
    case types.USER_FAVOURITE_COMPANIES:
      state = Object.assign({}, state, { following: state.following.push(action.payload) });
    break;
    case types.GET_FAVOURITES:
      state = Object.assign({}, state, { companies: action.payload });
    break;
    default:
      return state
  }
  return state;
}
