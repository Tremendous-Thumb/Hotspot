import {PANEL_OPEN_COLLECTION_ITEM } from '../actions/index';
import {PANEL_CLOSE_COLLECTION_ITEM } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case PANEL_CLOSE_COLLECTION_ITEM:
    return state = action.payload;
  case PANEL_CLOSE_COLLECTION_ITEM:
    return state = null;
  }
  return state;
}
