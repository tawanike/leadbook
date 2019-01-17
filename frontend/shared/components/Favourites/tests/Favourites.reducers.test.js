import reducer from '../reducers';
import * as types from '../types';

describe('Favourites Reducers', () => {
  it('should return initial state.', () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
    })
  })
})
