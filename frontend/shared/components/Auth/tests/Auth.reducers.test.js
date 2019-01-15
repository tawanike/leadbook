import reducer from '../reducers';
import * as types from '../types';

describe('Auth Reducers', () => {
  it('should return initial state.', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoggedIn: false,
      is_activated: false,
      error: false
    })
  })
})
