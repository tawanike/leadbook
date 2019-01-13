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
    const { dispatch } = this.props;

    axios({
      method: 'get',
      url: `http://localhost:8000/api/v1/search/?company=${this.state.company}`,
      // headers: { "CSRF-Token": window.user.csrfToken },
    })
    .then(response => {
      dispatch(actions.search(response.data.data));
    })
    .catch(error => {
      console.log('ERROR', error)
    });
  }

  render() {
    return(<div className="Search ">

      <div className="form-row">
        <div className="col-9">
          <input type="text" name="company" className="form-control"
            placeholder="Enter company name" onChange={ this.handleChange } />
        </div>
        <div className="col-3">
          <button onClick={ this.search }>Search</button>
        </div>
      </div>
      <h3>Search</h3>
      <SearchResults {...this.props} />
  </div>);
  }

}

export default SearchComponent;
