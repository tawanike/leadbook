import * as types from './types';

export function signIn(data){
  return {
    type: types.USER_SIGN_IN,
    payload: data
  }
}
