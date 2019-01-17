import * as types from './types';

export function getFavouriteCompanies(companies){
  return {
    type: types.GET_USER_FAVOURITES_SUCCESS,
    payload: companies
  }
}

export function getUserFavouriteCompanies(companies){
  return {
    type: types.GET_USER_FAVOURITES,
    payload: companies
  }
}

export function getFavourites(companies){
  return {
    type: types.GET_USER_FAVOURITES,
    payload: companies
  }
}

export function followCompany(companyId, userId, companies=[]) {
  return (dispatch, getState) => {
    dispatch({
      type: types.FOLLOW_COMPANY,
      payload: { company: companyId, user: userId }
    });
    // Update the list of companies a user follows
    dispatch({
      type: 'APPLICATION_MOUNTED'
    });

    dispatch({
      type: 'USER_FAVOURITE_COMPANIES',
      payload: companies.push(companyId)
    })

    //dispatch(getUserFavouriteCompanies(companyId));
  }
}

export function unFollowCompany(companyId, userId, companies=[]) {
  return (dispatch, getState) => {
    dispatch({
      type: types.UNFOLLOW_COMPANY
    });
    // Update the list of companies a user follows
    dispatch({
      type: 'APPLICATION_MOUNTED'
    });

    dispatch({
      type: 'USER_FAVOURITE_COMPANIES',
      payload: companies.filter((value, index, arr) => {
                return value = companyId;
              })
    })

    //dispatch(getUserFavouriteCompanies(companyId));
  }
};
