import * as types from './types';

export function signIn(status){
  return {
    type: types.USER_SIGN_IN,
    payload: status
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

export function signOut(){
  return {
    type: types.USER_SIGN_IN,
    payload: false
  }
}

export function setUserSignedIn(user) {
  return (dispatch, getState) => {
    // Set is signed in to true
    dispatch({
      type: types.USER_SIGN_IN,
      payload: true
    });
    // Set user profile in store
    dispatch({
      type: types.GET_USER_PROFILE_SUCCESS,
      payload: user
    });
  }
}
