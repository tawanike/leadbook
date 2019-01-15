import * as actions from '../actions'
import * as types from '../types'

describe('Auth Actions', () => {
  it('should carry a payload with value true.', () => {
    const status =  true
    const expectedAction = {
      type: types.USER_SIGN_IN,
      payload: status
    }
    expect(actions.signIn(status)).toEqual(expectedAction)
  })
})
