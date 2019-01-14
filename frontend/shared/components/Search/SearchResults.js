import './Style.scss';
import React from 'react';
import axios from 'axios';
import * as actions from './actions';
import { Link } from "react-router-dom";


class SearchResultComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderResults(){
    const { search } = this.props
    return search.results.map((result, index) => {
      return(<div className="Result" key={index}>
      <div className="Result__Logo"></div>
      <div className="Result__Body">
        <h3 className="Result__Title">{ result.name }</h3>
        <p>{ result.address }</p>
        <p>{ result.phone }</p>
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
