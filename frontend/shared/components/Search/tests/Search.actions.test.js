import * as actions from '../actions'
import * as types from '../types'

describe('Auth Actions signIn', () => {
  it('should carry a payload with value true.', () => {
    const results =  [{name: 'Company Name'}]
    const expectedAction = {
      type: types.SEARCH_RESULTS,
      payload: results
    }
    expect(actions.search(results)).toEqual(expectedAction)
  })
});
