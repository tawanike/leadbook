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
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  handleUnfollow(event){
    const { dispatch, user, company } = this.props;

    favouriteService.removeFavourite(`favourites`, company.id, user.profile.id)
    .then(response => {
      dispatch(actions.unFollowCompany(company.id, user.profile.id, user.following));
      dispatch(alerts.toggle(`You are no longer following ${ company.name }`, 'success'));
    })
    .catch(error => {
      dispatch(alerts.toggle(`Error occured trying to remove ${ company.name } from your favourite's list, please try again.`, 'error'));
    })
  }

  render() {
    const { favourites, company, user } = this.props;

      if(true === true){
      return(
        <button onClick={ this.handleUnfollow }
          className="Button Button__Block Button--primary Favourites__Button">Unfollow</button>);
      }else{
        return(
        <button onClick={ this.handleUnfollow }
          className="Button Button__Block Button--outline Favourites__Button">Follow</button>);
      }
  }
}

export default FavouritesButtonComponent;
