import * as types from './types';

export function toggle(message, severity){
  return (dispatch, getState) => {
    dispatch({
      type: types.TOGGLE_ALERT,
      payload: { message: message, visible: true, severity: severity }
    });

    setTimeout(function () {
      dispatch({
        type: types.TOGGLE_ALERT,
        payload: { message: '', visible: false, severity: ''  }
      })
    }, 5000);
  }
}
