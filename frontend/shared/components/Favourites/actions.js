import * as types from './types';

export function getFavouriteCompanies(companies){
  return {
    type: types.GET_USER_FAVOURITES_SUCCESS,
    payload: companies
  }
}

export function followCompany(companyId, userId) {

}