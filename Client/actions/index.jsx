import request from 'superagent';
import _ from 'lodash';

const endpoints = {
  logout: '/logout',
  spots: '/api/spots'
};

export const NAV_CLICK_COLLECTION = 'NAV_CLICK_COLLECTION';
export const NAV_CLICK_FILTER = 'NAV_CLICK_FILTER';
export const NAV_CLICK_LOGOUT = 'NAV_CLICK_LOGOUT';

export const PANEL_CLICK_FILTER_ITEM = 'PANEL_CLICK_FILTER_ITEM';
export const PANEL_OPEN_COLLECTION_ITEM = 'PANEL_OPEN_COLLECTION_ITEM';
export const PANEL_CLOSE_COLLECTION_ITEM = 'PANEL_CLOSE_COLLECTION_ITEM';
export const PANEL_DELETE_COLLECTION_ITEM = 'PANEL_DELETE_COLLECTION_ITEM';

export const MAP_CONFIRM_POINT = 'MAP_CONFIRM_POINT';
export const FETCH_COLLECTION = 'FETCH_COLLECTION';

// Click Handler for Nav Collection button
export function toggleCollectionList(panelMode) {
  // If panelMode is collection, set it to null.
  if (panelMode === 'collection') {
    panelMode = null;
  } else {
    // Else set panelMode to collection
    panelMode = 'collection';
  }

  return {
    type: NAV_CLICK_COLLECTION,
    payload: panelMode
  }
}

// Click Handler for Nav Filter button
export function toggleFilterList(panelMode) {
  // If panelMode is filter, set it to null.
  if (panelMode === 'filter') {
    panelMode = null;
  } else {
    // Else set panelMode to filter
    panelMode = 'filter';
  }

  return {
    type: NAV_CLICK_FILTER,
    payload: panelMode
  }
}

// Click Handler for Nav Logout button
export function logout(collection) {
  // Make final post request to update user's data
  request.post(endpoints.spots).send(collection);

  // End the user's session
  request.get(endpoints.logout);

  return {
    type: NAV_CLICK_LOGOUT
  }
}

// Click Handler for Panel Filter item
export function toggleFilter(filter, selectedFilters, collection) {
  // Check if given filter is in filter list
  const index = _.findIndex(selectedFilters, filter);
  if (index === -1) { 
    // Add it to the list if not found
    selectedFilters.push(filter);
  } else {  
    // remove it if it is not
    selectedFilters.splice(index, 1);
  }

  // make a list of the restaurants that match the filter
  const filteredRestaurants = {};
  _.map(collection, (spot) => {
    if (_.findIndex(selectedFilters, spot.type) > -1) {
      filteredRestaurants.push(spot);
    }
  });

  return {
    type: PANEL_CLICK_FILTER_ITEM,
    payload: {
      selectedFilters: selectedFilters,
      filteredRestaurants: filteredRestaurants
    }
  }
}

// Click Handler for Panel Collection item
export function viewCollectionItem(item) {
  // change current panel view to the collection item
  return {
    type: PANEL_OPEN_COLLECTION_ITEM,
    payload: item
  }
}

// Click Handler for Panel Collection closeup
export function closeCollectionItem(item) {
  // close the current panel view back to the collection
  return {
    type: PANEL_CLOSE_COLLECTION_ITEM
  }
}

export function deleteCollectionItem(item) {
  // delete the collection item from the db
  const collection = request.del(endpoints.spots + '/' + item.id);
  // update the collection and filters
  const filters = filterOrganizer(collection);

  return {
    type: PANEL_DELETE_COLLECTION_ITEM,
    payload: {
      collection: collection,
      filters: filters
    }
  }
}

// Click Handler for map's submit
export function clickLocationSubmit(name, latitude, longitude, rating, filters) {
  // Create object to make DB query
  const spotToAdd = {
    name: name,
    latitude: latitude,
    longitude: longitude,
    rating: rating
  };

  // Add type and image from returned request
  const data = request.post(endpoints.spots).send(spotToAdd);
  filters = filterOrganizer([data], filters);

  return {
    type: MAP_CONFIRM_POINT,
    payload: {
      newSpot: data,
      filters: filters
    }
  }
}

export function fetchCollection() {
  // This function should only be called once on startup
  // Query database for user's entire collection
  const collection = request.get(endpoints.spots);
  const filters = filterOrganizer(collection);

  return {
    type: FETCH_COLLECTION,
    payload: {
      collection: collection,
      filters: filters
    }
  }
}

filterOrganizer = (collection, filters) => {
  filters = filters || [];

  _.map(collection, (value) => {
    if (_.findIndex(filters, value) === -1) {
      filters.push(value);
    }
  })

  return filters;
}