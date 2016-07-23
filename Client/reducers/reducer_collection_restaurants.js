import { MAP_CONFIRM_POINT } from '../actions/index';
import { FETCH_RESTAURANTS } from '../actions/index';
import { POPULATE_FILTER_OPTIONS } from '../actions/index';
export default function(state = {}, action) {
  switch (action.type) {
  case MAP_CONFIRM_POINT:
    return {collection: state.collection.concat([ action.payload.newSpot ]) , ...state };
      // this syntax may not work, but here we need to concat every newspot entry that is saved
      // to our state.collection
      // if the above does not work then use this:
      // return { state.collection.concat([action.payload.newSpot])}
  case MAP_CONFIRM_POINT:
    return {...state, filterOptions: state.filterOptions.concat([action.payload.filters])}
  case FETCH_RESTAURANTS:
    return {...state, collection: action.payload};
  case POPULATE_FILTER_OPTIONS:
    return {...state, filterOptions: action.payload};
  }
  return state;
}
