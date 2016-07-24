import { NAV_CLICK_FILTER } from '../actions/index';
import { NAV_CLICK_COLLECTION } from '../actions/index';

const initialState = {
  panelMode: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NAV_CLICK_FILTER:
      return state.panelMode = action.payload;
    case NAV_CLICK_COLLECTION:
      return state.panelMode = action.payload;
    default:
      return state;
  }
}
