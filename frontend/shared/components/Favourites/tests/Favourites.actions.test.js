import * as actions from '../actions'
import * as types from '../types'

describe('Favourites Actions GET_USER_FAVOURITES_SUCCESS', () => {
  it('should carry a payload of array objects.', () => {
    const companies =  [{ name: "Test Company"}]
    const expectedAction = {
      type: types.GET_USER_FAVOURITES_SUCCESS,
      payload: companies
    }
    expect(actions.getFavouriteCompanies(companies)).toEqual(expectedAction)
  })
});
