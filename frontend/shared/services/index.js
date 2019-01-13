import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class CustomersService{

    constructor(){}

    find() {
        const url = `${API_URL}/api/customers/`;
        return axios.get(url).then(response => response.data);
    }

    findOne(id) {
        const url = `${API_URL}/api/customers/${id}`;
        return axios.get(url).then(response => response.data);
    }
    delete(id){
        const url = `${API_URL}/api/customers/${id}`;
        return axios.delete(url);
    }
    create(customer){
        const url = `${API_URL}/api/customers/`;
        return axios.post(url,customer);
    }
    update(customer){
        const url = `${API_URL}/api/customers/${customer.pk}`;
        return axios.put(url,customer);
    }
}
