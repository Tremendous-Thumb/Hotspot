import { PANEL_CLICK_FILTER_ITEM } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
  case PANEL_CLICK_FILTER_ITEM:
    return {...state, filterSelected: [action.payload.selectedFilters]};
  case PANEL_CLICK_FILTER_ITEM:
    return {...state, filteredRestaurants: [action.payload.filteredrestaurants]};
  }
}
