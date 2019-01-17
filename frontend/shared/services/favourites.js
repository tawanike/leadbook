import axios from 'axios';
import Service from './index';

export default class FavouriteService extends Service {
  constructor() {
    super();
  }

  removeFavourite(endpoint, company, user) {
    const favourite = company +'-'+ user;

    return this.delete(endpoint, favourite);
  }
}
