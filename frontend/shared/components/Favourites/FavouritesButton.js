import './Styles.scss';
import React from 'react';
import axios from 'axios';
import * as actions from './actions';
import { Link } from "react-router-dom";

class FavouritesButtonComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  handleFollow(event){
    const { dispatch, user, company } = this.props;
    dispatch(actions.followCompany(company, user.id))
  }

  handleUnfollow(event){
    const { user } = this.props;
  }

  render() {
    const { favourites } = this.props;
    if(true === true){
      return(
        <button onClick={this.handleFollow}
          className="Button Button__Block Button--outline Favourites__Button">Follow</button>
      );
    } else {
      return(
        <button
          className="Button Button__Block Button--primary Favourites__Button">Unfollow</button>
      );
    }
  }
}

export default FavouritesButtonComponent;
