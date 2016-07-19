import { combineReducers } from 'redux';
import CollectionRestaurants from './reducers/reducer_collection_restaurants';
import FilteredRestaurants from './reducers/reducer_filtered_restaurants';
import FilterOptions from './reducers/filter_options';
import FilterSelected from './reducers/filtered';

const rootReducer = combineReducers({
  allRestaurants: CollectionRestaurants,
  filteredRestaurants: FilteredRestaurants,
  filterOptions: FilterOptions,
  FilterSelected: FilterSelected
});

export default rootReducer;
