var defaultCoord = [37.7837008, -122.4111551];

L.mapbox.accessToken = 'pk.eyJ1Ijoicm1jY2hlc24iLCJhIjoiY2lxbHkxbXFiMDA5dWZubm5mNWkwdGYwbiJ9.QC1lP-2tNymbJ5tHaMugZw';

var Map = React.createClass({
  componentDidMount() {
    this.map = L.mapbox.map('map-one', 'mapbox.streets').setView(defaultCoord, 14);

    var restaurantPoints = L.mapbox.featureLayer().addTo(this.map);

    restaurantPoints.on('layeradd', function(point) {
      var marker = point.layer;
      var feature = marker.feature;
      marker.setIcon(L.icon(feature.properties.icon));
    });

    restaurantPoints.setGeoJSON(getSpots());
  },

  render() {
    return (
      <div className='map' id='map-one'></div>
    );
  }
});

////////// TESTING DATA - TODO REMOVE /////////
var tastyRestaurants = [
  {
    name: 'The Flying Falafal',
    latitude: 37.7812322,
    longitude: -122.4134787,
    rating: 5
  },
  {
    name: 'Show Dogs',
    latitude: 37.7821228,
    longitude: -122.4130593,
    rating: 5
  },
  {
    name: 'Lemonade',
    latitude: 37.7848661,
    longitude: -122.4057182,
    rating: 5
  },
  {
    name: 'Super Duper Burgers',
    latitude: 37.7862143,
    longitude: -122.4053212,
    rating: 5
  },
  {
    name: 'Denny\'s',
    latitude: 37.7859249,
    longitude: -122.407801,
    rating: 0
  }
];

////////// TEMPLATES FOR GEOPOINT and GEOSET in geoJSON FORMAT //////////
var geoJSONPoint = (longitude, latitude) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude] // [longitude, latitude]
    },
    properties: {
      icon: {
        iconUrl: 'http://emojipedia-us.s3.amazonaws.com/cache/79/bb/79bb8226054d3b254d3389ff8c9fe534.png',
        iconSize: [35, 35],
        iconAnchor: [20, 20]
      }
    } // for styling
  };
};

var geoJSONSet = () => {
  return [
    {
      type: 'FeatureCollection',
      features: []
    }
  ];
};

////////// HELPER FUNCTIONS - TODO MODULARIZE //////////
var getSpots = () => {
  var spotsSet = geoJSONSet();
  var restaurant, lati, long;

  for (var i = 0; i < tastyRestaurants.length; i += 1) {
    restaurant = tastyRestaurants[i];
    lati = restaurant.latitude;
    long = restaurant.longitude;
    restaurant = geoJSONPoint(long, lati);
    spotsSet[0].features.push(restaurant);
  }
  return spotsSet;
};

window.Map = Map;
