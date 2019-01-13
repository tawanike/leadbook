import * as types from './types';

export function search(data){
  return {
    type: types.SEARCH_RESULTS,
    payload: data
  }
}
