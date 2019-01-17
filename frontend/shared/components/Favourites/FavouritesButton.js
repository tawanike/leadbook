import './Styles.scss';
import React from 'react';
import * as actions from './actions';
import * as alerts from '../Alerts/actions';
import { Link } from "react-router-dom";
import FavouriteService from '../../services/favourites';
const favouriteService = new FavouriteService();

class FavouritesButtonComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  handleFollow(event){
    const { dispatch, user, company } = this.props;
    favouriteService.create('favourites', { user: user.id, company: company.id})
    .then(response => {
      dispatch(actions.followCompany(company.id, user.id))
      dispatch(alerts.toogle(`${ comapny.name } has been added to your favourite's list.`, 'success'))
    })
    .catch(error => {
      // Hand error
    })

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
