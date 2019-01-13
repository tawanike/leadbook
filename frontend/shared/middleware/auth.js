import * as authActions from '../components/Auth/SignIn/actions';
const jwtDecode = require('jwt-decode');

const authMiddleware = store => next => action => {
  const state = store.getState();
  if(action.type === '@@router/LOCATION_CHANGE') {
    if(window.localStorage.getItem('token')){

      const decoded = jwtDecode(window.localStorage.getItem('token'));
      store.dispatch({ type: 'GET_USER_PROFILE', payload: decoded.profile })
      store.dispatch(authActions.getUser(decoded.profile));
      store.dispatch(authActions.signIn(true));
    } else {
      if (state.auth.isLoggedIn) {
        console.log('USER IS LOGGED IN')
      } else {
        const pages = ['/pages']

        if(pages.includes(state.router.location.pathname)){
          console.log('YOU NEED TO BE LOGGED IN')
        } else {
          console.log('YOU DO NOT NEED TO BE LOGGED IN')
        }
      }
    }
  }
  next(action);
}

export default authMiddleware;
