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
export function toggleCollectionList(panelMode, isOpen) {
  // If panelMode is collection, set it to null.
  if (panelMode === 'collection' && isOpen === true) {
    isOpen = false;
  } else {
    // Else set panelMode to collection
    panelMode = 'collection';
    isOpen = true;
  }


  return {
    type: NAV_CLICK_COLLECTION,
    payload: {
      panelMode: panelMode,
      isOpen: isOpen
    }
  };
}

// Click Handler for Nav Filter button
export function toggleFilterList(panelMode, isOpen) {
  // If panelMode is filter, set it to null.
  if (panelMode === 'filter' && isOpen === true) {
    isOpen = false;
  } else {
    // Else set panelMode to filter
    panelMode = 'filter';
    isOpen = true;
  }


  return {
    type: NAV_CLICK_FILTER,
    payload: {
      panelMode: panelMode,
      isOpen: isOpen
    }
  };
}

// Click Handler for Nav Logout button
export function logout(collection) {
  // Make final post request to update user's data
  request.post(endpoints.spots).send(collection);

  console.log('logout');
  // End the user's session
  request.get(endpoints.logout);

  return {
    type: NAV_CLICK_LOGOUT
  };
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
      selectedFilters: selectedFilters.slice(),
      filteredRestaurants: filteredRestaurants.slice()
    }
  };
}

// Click Handler for Panel Collection item
export function viewCollectionItem(item) {
  // change current panel view to the collection item
  return {
    type: PANEL_OPEN_COLLECTION_ITEM,
    payload: item
  };
}

// Click Handler for Panel Collection closeup
export function closeCollectionItem(item) {
  // close the current panel view back to the collection
  return {
    type: PANEL_CLOSE_COLLECTION_ITEM
  };
}

export function deleteCollectionItem(item) {
  // delete the collection item from the db
  const collection = request.del(endpoints.spots + '/' + item.id);
  // update the collection and filters
  const filters = filterOrganizer(collection);

  return {
    type: PANEL_DELETE_COLLECTION_ITEM,
    payload: {
      collection: collection.slice(),
      filters: filters.slice()
    }
  };
}

// Click Handler for map's submit
export function clickLocationSubmit(name, latitude, longitude, rating) {
  // Create object to make DB query
  const spotToAdd = {
    name: name,
    latitude: latitude,
    longitude: longitude,
    rating: rating
  };

  // Add type and image from returned request
  console.log('location submit');
  return makePostRequest(endpoints.spots, spotToAdd)
    .then((spot) => {
      console.log('got this back', spot);
      spot = JSON.parse(spot.text).data;
      const filters = filterOrganizer([spot], filters);
      return {
        type: MAP_CONFIRM_POINT,
        payload: {
          newSpot: spot,
          filters: filters.slice()
        }
      };
    })
    .catch((err) => console.log(err));
}

export function fetchCollection() {
  // This function should only be called once on startup
  // Query database for user's entire collection
  // const collection = request.get(endpoints.spots);
  // const collection = [
  //   {
  //     name: 'The Flying Falafal',
  //     latitude: 37.7812322,
  //     longitude: -122.4134787,
  //     rating: 5,
  //     type: 'middle-east'
  //   },
  //   {
  //     name: 'Show Dogs',
  //     latitude: 37.7821228,
  //     longitude: -122.4130593,
  //     rating: 5,
  //     type: 'american'
  //   },
  //   {
  //     name: 'Lemonade',
  //     latitude: 37.7848661,
  //     longitude: -122.4057182,
  //     rating: 5,
  //     type: 'drink'
  //   },
  //   {
  //     name: 'Super Duper Burgers',
  //     latitude: 37.7862143,
  //     longitude: -122.4053212,
  //     rating: 5,
  //     type: 'american'
  //   },
  //   {
  //     name: 'Réveille Coffee Co.',
  //     latitude: 37.7735341,
  //     longitude: -122.3942448,
  //     rating: 5,
  //     type: 'coffee'
  //   },
  //   {
  //     name: 'Denny\'s',
  //     latitude: 37.7859249,
  //     longitude: -122.407801,
  //     rating: 0,
  //     type: 'american'
  //   }
  // ];
  return makeGetRequest(endpoints.spots)
    .then((spots) => {
      console.log('got this back', spots);
      spots = JSON.parse(spots.text).data;
      const filters = filterOrganizer(spots);
      // cb(spots);
      return {
        type: FETCH_COLLECTION,
        payload: {
          collection: spots.slice(),
          filters: filters.slice()
        }
      };
    })
    .catch((err) => console.log(err));
}


function filterOrganizer(collection, filters) {
  filters = filters || [];

  _.map(collection, (value) => {
    if (_.findIndex(filters, value.type) === -1) {
      filters.push(value.type);
    }
  });

  return filters;
}

function makePostRequest(endpoint, data) {
  console.log('making post request');
  return new Promise((resolve, reject) => {
    request.post(endpoint)
      .send(data)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
  });
}

function makeGetRequest(endpoint) {
  console.log('making get request');
  return new Promise((resolve, reject) => {
    request.get(endpoint)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
  });
}
