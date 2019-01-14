import * as types from './types';

let initialState = {
  results: [],
  details: {
    count: 0,
    next: '',
    previous: '',
    pages: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_RESULTS:
      state = Object.assign({}, state, {
        results: action.payload.data,
        details: {
          count: action.payload.count,
          next: action.payload.nextlink,
          previous: action.payload.prevlink,
          pages: action.payload.numpages
        }
       });
    break;
    default:
      return state
  }
  return state;
}
