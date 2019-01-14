import * as types from './types';

export function signIn(data){
  return {
    type: types.USER_SIGN_IN,
    payload: data
  }
}

export function accountActivated(status){
  if (status) {
    return {
      type: types.USER_ACCOUNT_ACTIVATED
    }
  } else {
    return {
      type: types.USER_ACCOUNT_ACTIVATION_ERROR
    }
  }
}

export function getUser(data){
  return {
    type: types.USER_SIGN_IN,
    payload: data
  }
}
