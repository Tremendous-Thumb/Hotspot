import { PANEL_CLICK_FILTER_ITEM } from '../actions/index';

const initialState = {
  filterSelected: [],
  filteredRestaurants: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PANEL_CLICK_FILTER_ITEM:
      return {
        ...state,
        filterSelected: action.payload.selectedFilters,
        filteredRestaurants: action.payload.filteredrestaurants
      };
    default:
      return state;
  }
}
