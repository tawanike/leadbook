import './Styles.scss';
import React from 'react';
import axios from 'axios';
import * as actions from './actions';
import { Link } from "react-router-dom";

class FavouritesComponent extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    const { favourites } = this.props;
    
      return(
        <button onClick={this.handleFollow}
          className="Button Button__Block Button--outline Favourites__Button">Follow</button>
      );

  }
}

export default FavouritesComponent;
