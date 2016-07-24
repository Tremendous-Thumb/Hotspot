import { MAP_CONFIRM_POINT } from '../actions/index';
import { FETCH_RESTAURANTS } from '../actions/index';
import { PANEL_DELETE_COLLECTION_ITEM } from '../actions/index';

const initialState = {
  filterOptions: [],
  collection: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MAP_CONFIRM_POINT:
      return {
        ...state,
        filterOptions: action.payload.filters,
        collection: state.collection.concat(action.payload.newSpot)
      };
    case FETCH_RESTAURANTS:
      return {
        ...state,
        filterOptions: action.payload.filters,
        collection: action.payload.collection
      };
    case PANEL_DELETE_COLLECTION_ITEM:
      return {
        ...state,
        filterOptions: action.payload.filters,
        collection: action.payload.collection
      }
    default:
      return state;
  }
}
