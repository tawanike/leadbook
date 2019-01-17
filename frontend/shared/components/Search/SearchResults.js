import './Style.scss';
import React from 'react';
import axios from 'axios';
import * as actions from './actions';
import { Link } from "react-router-dom";
import FavouritesButtonComponent from '../Favourites/FavouritesButton';

class SearchResultComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderResults(){
    const { search } = this.props
    return search.results.map((result, index) => {
      return(<div className="Result" key={index}>
      <div className="Result__Logo">
        <img src={ result.logo } />
      </div>
      <div className="Result__Body">
        <h4 className="Result__Title">{ result.name }</h4>
        <dl>
          <dt>{ result.building }</dt>
          <dt>{ result.address_line_one }</dt>
          <dt>{ result.address_line_two }</dt>
          <dt>{ result.city }, { result.postcode }</dt>
          <dt>{ result.province }, { result.country }</dt>
        </dl>
      </div>
      <div className="Result__Side">
        <p>Category</p>
        <p>Tel: { result.phone }</p>
        <p><FavouritesButtonComponent company={ result } { ...this.props } /></p>
      </div>
    </div>)
    });
  }

  render() {
    return(<div>
      { this.renderResults() }
    </div>);
  }

}

export default SearchResultComponent;
