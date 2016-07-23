import { combineReducers } from 'redux';
import CollectionRestaurantsFilters from './reducer_collection_restaurants';
import FilterSelectedRestaurants from './reducer_filtered_restaurants';
import PanelMode from './reducer_panel_mode';
import PanelSelect from './reducer_panel_select';

const rootReducer = combineReducers({
  CollectionRestaurantsFilters: CollectionRestaurantsFilters,
  PanelMode: PanelMode,
  FilterSelectedRestaurants: FilterSelectedRestaurants,
  PanelSelect: PanelSelect
});

export default rootReducer;
