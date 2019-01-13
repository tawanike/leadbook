import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class SearchService{

    constructor(){}

    getCustomers() {
        const url = `${API_URL}/api/customers/`;
        return axios.get(url).then(response => response.data);
    }
}
