import Service from './index';

export default class AuthService extends Service {
  constructor() {
    super();
  }

  checkAvailability(field, query) {
    return this.findByUsernameOrEmail('users/availability', query, field);
  }


}
