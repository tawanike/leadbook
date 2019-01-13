import * as types from './types';

let initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_RESULTS:
      state = Object.assign([], state, action.payload);
    break;
    default:
      return state
  }
  return state;
}
