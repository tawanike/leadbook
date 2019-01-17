import axios from 'axios';
const API_URL = 'http://localhost:8000/api/v1';

export default class Service{

    constructor(){
      if(window.localStorage.getItem('token')){
        axios.defaults.headers = {
           'Content-Type': 'application/json',
           'Authorization': `JWT ${window.localStorage.getItem('token')}`,

        };
      }
    }

    find(endpoint) {
      const url = `${API_URL}${endpoint}`;
      return axios.get(url).then(response => response.data);
    }

    findAll(endpoint, id) {
      const url = `${API_URL}/${endpoint}/${id}`;
      return axios.get(url).then(response => response.data);
    }

    findByUsernameOrEmail(endpoint, query, field=null) {
      if(!field){
        const url = `${API_URL}/${endpoint}/?username=${query}`;
        return axios.get(url);
      } else {
        const url = `${API_URL}/${endpoint}/?${field}=${query}`;
        return axios.get(url);
      }
    }

    delete(endpoint, id){
        const url = `${API_URL}/${endpoint}/${id}`;
        return axios.delete(url);
    }

    create(endpoint, data){
      return axios({
        method: 'POST',
        url: `${API_URL}/${endpoint}/`,
        data: data
      });
    }

    update(endpoint, data){
      const url = `${API_URL}${endpoint}/${id}`;
      return axios.put(url, data);
    }

    activate(activation_code) {
      const url = `${API_URL}/users/activate/${activation_code}`;
      return axios.get(url)
    }

    authorise(credentials){
      return axios({
        method: 'POST',
        url: `${API_URL}/auth/`,
        data: credentials
      });
    }
}
