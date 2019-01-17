import './Styles.scss';
import React from 'react';
import axios from 'axios';
import * as actions from './actions';
import { Link } from "react-router-dom";
import FavouritesList from './FavouritesList';
import FavouriteService from '../../services/favourites';
const favouriteService = new FavouriteService();


class FavouritesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: ''
    }

  }

  componentWillMount(){
    const { auth, history } = this.props;
    if(!auth.isLoggedIn) {
      history.push('/accounts/login')
    }
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    favouriteService.findAll('favourites', user.profile.id)
    .then(response => {
      dispatch(actions.getFavourites(response.data));
    })
    .catch(error => {
      console.log('Error');
    })
  }



  render() {
    return(<div className="Search">
    <div className="container">
      <FavouritesList {...this.props} />
    </div>
  </div>);
  }
}

export default FavouritesComponent;
