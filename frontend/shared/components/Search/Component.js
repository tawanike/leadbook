import './Style.scss';
import React from 'react';
import axios from 'axios';
import * as actions from './actions';
import { Link } from "react-router-dom";
import SearchResults from './SearchResults';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount(){
    const { auth, history } = this.props;
    if(!auth.isLoggedIn) {
      history.push('/accounts/login')
    }
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
  }

  search (){
    const { dispatch, history } = this.props;

    axios({
      method: 'get',
      url: `http://localhost:8000/api/v1/search/?company=${this.state.company}`,
      // headers: { "CSRF-Token": window.user.csrfToken },
    })
    .then(response => {
      dispatch(actions.search(response.data));
      history.push({
        pathname: '/search',
        search: `?q=${this.state.company}`
      })
    })
    .catch(error => {
      console.log('ERROR', error)
    });
  }

  render() {
    const { search } = this.props;

    return(<div className="Search">
    <div className="container">
      <div className="form-row Search__Box">
        <div className="col-8 offset-md-2">
          <input type="text" name="company" className="Search__Input"
            placeholder="Enter company name" onChange={ this.handleChange } />
          <button className="Search__Button" onClick={ this.search }>Search</button>
        </div>
      </div>
      <p className="Search__Count">Search found { search.details.count } companies.</p>
      <SearchResults {...this.props} />
    </div>
  </div>);
  }
}

export default SearchComponent;
