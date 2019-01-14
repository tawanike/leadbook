import * as types from './types';

let initialState = {
  visible: false,
  message: 'message',
  severity: 'severity'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_ALERT:
      state = Object.assign({}, state, {
        visible: action.payload.visible,
        message: action.payload.message,
        severity: action.payload.severity
       });
    break;
    default:
      return state
  }
  return state;
}
