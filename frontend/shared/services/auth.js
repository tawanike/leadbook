import axios from 'axios';
import Service from './index';
import Globals from '../globals';

export default class AuthService extends Service {
  constructor() {
    super();
    if(window.localStorage.getItem('token')){
      axios.defaults.headers = {
         'Content-Type': 'application/json',
         'Authorization': `JWT ${window.localStorage.getItem('token')}`,
      };
    }
  }

  checkAvailability(field, query) {
    return this.findByUsernameOrEmail('users/availability', query, field);
  }

  resetPassword(email) {
    return axios({
      method: 'POST',
      url: `${Globals.apiDev}users/reset-password/`,
      data: email
    });
  }

  createPassword(code, credentials) {
    return axios({
      method: 'POST',
      url: `${Globals.apiDev}users/create-password/${code}/`,
      data: credentials
    });
  }

}
