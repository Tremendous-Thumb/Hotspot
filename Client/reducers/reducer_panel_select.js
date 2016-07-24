import {PANEL_OPEN_COLLECTION_ITEM } from '../actions/index';
import {PANEL_CLOSE_COLLECTION_ITEM } from '../actions/index';

const initialState = {
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PANEL_OPEN_COLLECTION_ITEM:
      return {
        ...state,
        item: action.payload
      };
    case PANEL_CLOSE_COLLECTION_ITEM:
      return {
        ...state,
        item: null
      };
    default:
      return state;
  }
}
