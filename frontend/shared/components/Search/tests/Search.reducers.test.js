import reducer from '../reducers';
import * as types from '../types';

describe('Auth Reducers', () => {
  it('should return initial state.', () => {
    expect(reducer(undefined, {})).toEqual({
      results: [],
      details: {
        count: 0,
        next: '',
        previous: '',
        pages: 0
      }
    })
  })
})
