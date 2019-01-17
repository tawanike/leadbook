import * as actions from '../actions'
import * as types from '../types'

describe('Auth Actions signIn', () => {
  it('should carry a payload with value true.', () => {
    const status =  true
    const expectedAction = {
      type: types.USER_SIGN_IN,
      payload: status
    }
    expect(actions.signIn(status)).toEqual(expectedAction)
  })
});

describe('Auth Actions accountActivated', () => {
  it('should dispatch type USER_ACCOUNT_ACTIVATED.', () => {
    const status =  true
    const expectedAction = {
      type: types.USER_ACCOUNT_ACTIVATED
    }
    expect(actions.accountActivated(status)).toEqual(expectedAction)
  })
});

describe('Auth Actions accountActivated', () => {
  it('should dispatch type USER_ACCOUNT_ACTIVATION_ERROR.', () => {
    const status =  false
    const expectedAction = {
      type: types.USER_ACCOUNT_ACTIVATION_ERROR
    }
    expect(actions.accountActivated(status)).toEqual(expectedAction)
  })
});
