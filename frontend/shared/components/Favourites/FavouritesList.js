import './Styles.scss';
import React from 'react';
import axios from 'axios';
import * as actions from './actions';
import { Link } from "react-router-dom";
import FavouritesButtonComponent from '../Favourites/FavouritesButton';

class FavouritesListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderResults(){
    const { favourites } = this.props;

    return favourites.data.map((result, index) => {
      return(<div className="Result" key={index}>
      <div className="Result__Logo">
        <img src={ result.company.logo } />
      </div>
      <div className="Result__Body">
        <h4 className="Result__Title">{ result.company.name }</h4>
        <dl>
          <dt>{ result.company.building }</dt>
          <dt>{ result.company.address_line_one }</dt>
          <dt>{ result.company.address_line_two }</dt>
          <dt>{ result.company.city }, { result.company.postcode }</dt>
          <dt>{ result.company.province }, { result.company.country }</dt>
        </dl>
      </div>
      <div className="Result__Side">
        <p>Category</p>
        <p>Tel: { result.company.phone }</p>
        <p><FavouritesButtonComponent company={ result.company } { ...this.props } /></p>
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

export default FavouritesListComponent;
