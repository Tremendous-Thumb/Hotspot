# Mapping  and Usage #

## Contents ##
### Core Usage ###

* [Gather User Location](#gathering-user-location)
* [Request Map Tilesets - Mapbox](#request-map-tilesets-\--mapbox)
* [Overlay Custom Styling - Mapbox & Leaflet](#overlay-custom-styling-\--mapbox-and-leaflet)
* [Searching and Grabbing Click Locations](#searching-and-grabbing-click-locations)
* [Gather Photos Data and Other Destination Information - Yelp](#gather-photo-data-and-other-destination-information-\--yelp)

### Other Information ###

* [License Requirements and Usage Limits](#license-requirements-and-usage-limits)
* [Useful Links](#useful-links)

# Core Usage #
## Gathering User Location ##

Widely supported in most browsers for desktop and mobile devices. Recommended to use some sort of error handling and detection of feature.

For testing whether a user is able to use this feature and option is to use Modernizr to check ( https://modernizr.com/ )

Use Javascript `navigator.Geolocation` object which will grab the current location, although attempts to do this as quickly as possible so accuracy may be compromised. On success we will receive an object with `coords.latitude` and `coords.longitude` values.

```javascript
navigator.geolocation.getCurrentPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});
```

If we wish to watch the current position the geolocation provides the following.
```javascript
var watchID = navigator.geolocation.watchPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});
```
Both the get and watch accept a success and error callback. As geolocation is complicated and there are many areas in which it can fail error handling is especially important.

## Request Map Tilesets - Mapbox ##
#### HTML Setup ####
Initialize the mapbox.js library as well as styling. Can use hosted version as following.
```html-5
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.2.4/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.2.4/mapbox.css' rel='stylesheet' />
<script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />


  <body>
  <div id='map-one' class='map'> </div>
  </body>
```
Associated CSS required
```css
#map-one { height: 180px; }
```

#### JS Setup ####
Create a new Mapbox map as following.
*  Centered on coordinate location included in setView.
* map-one: corresponds to the div id above.
* mapbox.streets: map ID. Create with mapbox editor.
* setView: centered on coordinate location included in setView.
```javascript
L.mapbox.accessToken = 'MYACCESSTOKEN';
  L.mapbox.map('map-one', 'mapbox.streets').setView([38.8929,-77.0252], 14);
```


## Overlay Custom Styling - Mapbox and Leaflet ##
#### Add Pin to Map ####
Mapbox.js supports a few formats for adding pins to maps. The one we have chosen is the GeoJSON format. This is a format used for storing geometric shapes and marker positions. A single point can be represented like the following.
```GeoJSON
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.0366048812866,
          38.89784666877921
        ]
      },
      "properties": {}
    }
  ]
}
```
There is a useful tool called [geojson.io](http://geojson.io/) which can write GeoJSON for you.

To add a marker we will store our GeoJSON data as an array called `geojson` and create a `featurelayer` to add it to the map.

```javascript
var myLayer = L.mapbox.featureLayer().addTo(map);
myLayer.setGeoJSON(geojson);
```

#### Add Styling to Point ####
The GeoJSON point allows us to style this point with the `properties` object. Styles will be defined by the [Simplestyle rules](https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0). The properties object would look like the following:
```GeoJSON
"properties": {
        "title": "The White House",
        "marker-color": "#9c89cc",
        "marker-size": "medium",
        "marker-symbol": "building"
      }
```

We are able to style utilizing a picture with the `L.icon` function.
```javascript
var myIcon = L.icon({
	iconUrl: 'my-icon.png',
	iconRetinaUrl: 'my-icon@2x.png',
	iconSize: [38, 95],
	iconAnchor: [22, 94],
	popupAnchor: [-3, -76],
	shadowUrl: 'my-icon-shadow.png',
	shadowRetinaUrl: 'my-icon-shadow@2x.png',
	shadowSize: [68, 95],
	shadowAnchor: [22, 94]
});

L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
```
More help for customizing markers may be found [here](https://www.mapbox.com/help/markers/)

#### Popup Information ####
The content of the popup is customizable with `bindPopup`.
Within the JS is the following
```javascript
myLayer.on('layeradd', function(e) {
  var marker = e.layer,
    feature = marker.feature;
  marker.setIcon(L.icon(feature.properties.icon));
  var content = '<h2>'+ feature.properties.title+'<\/h2>' + '<img src="'+feature.properties.image+'" alt="">';
  marker.bindPopup(content);
});
```
This combines with the information in `GeoJSON`:
```GeoJSON
"properties": {
      "title": "Mapbox SF",
      "description": "155 9th St, San Francisco",
      "image": "https://farm9.staticflickr.com/8571/15844010757_63b093d527_n.jpg",
```
## Searching and Grabbing Click Locations ##
#### Get Latitude and Longitude When Clicked ####
Due to Leaflet we have event methods so if we want to grab data when a user clicks on a particular point we could use the following which would make a popup once clicked with map coordinates shown:
``` javascript
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
```

#### Searching for Business Location and Name ####
The Mapbox Geocoding API does two things: geocoding and reverse geocoding.

Geocoding lets you convert location text into geographic coordinates: turning 1600 Pennsylvania Ave NW into -77.0366, 38.8971.

Reverse geocoding turns geographic coordinates into place names: from -77.036, 38.897 to 1600 Pennsylvania Ave NW. These place names can vary from specific addresses to states and countries that contain the given coordinate.

Add the mapbox geocoder control to search for places using the Mapbox Geocoding API.
[Sample Search](https://www.mapbox.com/mapbox.js/example/v1.0.0/geocoding/)

Include in HTML
```HTML
<script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />
<style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
<div id='map'></div>
```

Add in javascript
```javascript
L.mapbox.accessToken = 'PERSONALACCESSTOKEN';
L.mapbox.map('map', 'mapbox.streets')
    .addControl(L.mapbox.geocoderControl('mapbox.places'));
```
We are also able to set a map point after listening for a `geocoder.input`.

## Gather Photo Data and Other Destination Information - Yelp ##

## Storage of User Mapping Information ##
#### Internal Information Stored in Database ####
* Name of Location
* User rating
* Map longitude
* Map latitude
* Yelp business ID for future requests

# Other Information #
## Yelp JSON Request and Response ##
#### AJAX Request for Initial Yelp information ####
* General search GET endpoint - `https://api.yelp.com/v2/`

###### Primary Search Parameters Used By Application ######

| Name  | Type   | Comments                 |
|-------|:------:|-------------------------:|
| term  | string | Use for bus name         |
| limit | number | Use 1                    |
| sort  | number | Use 0 - best match       |
| cll   | float,float| latitude,longitude   |

###### Primary Response Keys Used ######

| Name      | Type   | Definition             | Stored?    |
|-----------|:------:|:----------------------:|-----------:|
| id        | string | Yelp ID                | Stored     |
| image_url | string | URL photo for business | Not stored |

###### AJAX Request for older stored information ######
* GET endpoint - `https://api.yelp.com/v2//v2/business/{id}`

| Name  | Type   | Comments                 |
|-------|:------:|-------------------------:|
| id    | string | Yelp ID stored in DB     |


###### Sample AJAX Response from Yelp (for term=yelp, location=sf, limit=1): ######
```JSON
{
    "businesses": [
        {
            "categories": [
                [
                    "Local Flavor",
                    "localflavor"
                ],
                [
                    "Mass Media",
                    "massmedia"
                ]
            ],
            "display_phone": "+1-415-908-3801",
            "id": "yelp-san-francisco",
            "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/nQK-6_vZMt5n88zsAS94ew/ms.jpg",
            "is_claimed": true,
            "is_closed": false,
            "location": {
                "address": [
                    "140 New Montgomery St"
                ],
                "city": "San Francisco",
                "coordinate": {
                    "latitude": 37.7867703362929,
                    "longitude": -122.399958372115
                },
                "country_code": "US",
                "cross_streets": "Natoma St & Minna St",
                "display_address": [
                    "140 New Montgomery St",
                    "Financial District",
                    "San Francisco, CA 94105"
                ],
                "geo_accuracy": 9.5,
                "neighborhoods": [
                    "Financial District",
                    "SoMa"
                ],
                "postal_code": "94105",
                "state_code": "CA"
            },
            "mobile_url": "http://m.yelp.com/biz/yelp-san-francisco",
            "name": "Yelp",
            "phone": "4159083801",
            "rating": 2.5,
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c7fb9aff59f9/ico/stars/v1/stars_2_half.png",
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/d63e3add9901/ico/stars/v1/stars_large_2_half.png",
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/8e8633e5f8f0/ico/stars/v1/stars_small_2_half.png",
            "review_count": 7140,
            "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/photo/YcjPScwVxF05kj6zt10Fxw/ms.jpg",
            "snippet_text": "What would I do without Yelp?\n\nI wouldn't be HALF the foodie I've become it weren't for this business.    \n\nYelp makes it virtually effortless to discover new...",
            "url": "http://www.yelp.com/biz/yelp-san-francisco"
        }
    ],
    "total": 2316
}
```

###### Sample AJAX Response from Yelp Business ID Search ######
```JSON
{
    "categories": [
        [
            "Indian",
            "indpak"
        ],
        [
            "Himalayan/Nepalese",
            "himalayan"
        ]
    ],
    "deals": [
        {
            "currency_code": "USD",
            "image_url": "http://s3-media4.ak.yelpcdn.com/dphoto/ShQGf5qi-52HwPiKyZTZ3w/m.jpg",
            "options": [
                {
                    "formatted_original_price": "$20",
                    "formatted_price": "$10",
                    "is_quantity_limited": true,
                    "original_price": 2000,
                    "price": 1000,
                    "purchase_url": "http://www.yelp.com/deal/cC24ccQGIH8mowfu5Vbe0Q/view",
                    "remaining_count": 36,
                    "title": "$10 for $20 voucher"
                }
            ],
            "url": "http://www.yelp.com/biz/urban-curry-san-francisco?deal=1",
            "is_popular": true,
            "time_start": 1317414369,
            "title": "$10 for $20 voucher"
        }
    ],
    "display_phone": "+1-415-677-9743",
    "eat24_url": "http://e24.io/r/5769?utm_campaign=public&utm_medium=yelpapi&utm_source=yelpapi",
    "gift_certificates": [
        {
            "currency_code": "USD",
            "image_url": "http://s3-media4.ak.yelpcdn.com/bphoto/Hv5vsWpqeaUKepr9nffJnw/m.jpg",
            "options": [
                {
                    "formatted_price": "$25",
                    "price": 2500
                },
                {
                    "formatted_price": "$50",
                    "price": 5000
                }
            ],
            "url": "http://www.yelp.com/gift-certificates/some-donut-place-pasadena",
            "id": "ZZy5EwrI3wyHw8y54jZruA",
            "unused_balances": "CREDIT"
        }
    ],
    "id": "urban-curry-san-francisco",
    "image_url": "http://s3-media1.fl.yelpcdn.com/bphoto/u5b1u7c04C1GkptUg0grdA/ms.jpg",
    "is_claimed": true,
    "is_closed": false,
    "location": {
        "address": [
            "523 Broadway"
        ],
        "city": "San Francisco",
        "coordinate": {
            "latitude": 37.7978994,
            "longitude": -122.4059649
        },
        "country_code": "US",
        "cross_streets": "Romolo Pl & Kearny St",
        "display_address": [
            "523 Broadway",
            "North Beach/Telegraph Hill",
            "San Francisco, CA 94133"
        ],
        "geo_accuracy": 9.5,
        "neighborhoods": [
            "North Beach/Telegraph Hill",
            "Chinatown"
        ],
        "postal_code": "94133",
        "state_code": "CA"
    },
    "menu_date_updated": 1443040751,
    "menu_provider": "single_platform",
    "mobile_url": "http://m.yelp.com/biz/urban-curry-san-francisco",
    "name": "Urban Curry",
    "phone": "4156779743",
    "rating": 4.0,
    "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png",
    "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png",
    "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png",
    "review_count": 455,
    "reviews": [
        {
            "excerpt": "One of the owners is a former Sherpa from Nepal who has summitted Mt. Everest twice. While the restaurant is in a seeder part of the City, it's also on one...",
            "id": "flAK8Mu4auUdcFNR7iPa6Q",
            "rating": 4,
            "rating_image_large_url": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png",
            "rating_image_small_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png",
            "rating_image_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png",
            "time_created": 1440895245,
            "user": {
                "id": "3KNNxsQa4uooK5FAj7bVaQ",
                "image_url": "http://s3-media3.fl.yelpcdn.com/photo/hk31BkJvJ8qcqoUvZ38rmQ/ms.jpg",
                "name": "Hilary C."
            }
        }
    ],
    "snippet_image_url": "http://s3-media3.fl.yelpcdn.com/photo/hk31BkJvJ8qcqoUvZ38rmQ/ms.jpg",
    "snippet_text": "One of the owners is a former Sherpa from Nepal who has summitted Mt. Everest twice. While the restaurant is in a seeder part of the City, it's also on one...",
    "url": "http://www.yelp.com/biz/urban-curry-san-francisco"
}
```

## License Requirements and Usage Limits ##
#### Yelp API Applicable Requirements ####
* Wherever you display information from the API, you’ll also need to display our logo (see below) in a manner that’s obvious to the casual user that the information originates from Yelp.
  * [Download Button Assets](https://s3-media3.fl.yelpcdn.com/assets/srv0/developer_pages/f73a1e84f01d/assets/img/yelp_btn.zip)
  * [Download Logo Assets](https://s3-media4.fl.yelpcdn.com/assets/srv0/developer_pages/cc08602878a7/assets/img/yelp_logo.zip)
* Fully attribute your use of our content by linking directly to the applicable Yelp pages.
* You always need to display our aggregate star rating graphics and the number of reviews on which they’re based.

#### Yelp API Applicable Prohibitions ####
* Don’t store any information from the API. Business ID information may be stored for back-end matching purposes only, but if your app otherwise requires caching beyond the duration of a user session it will require specific approval beyond the scope of the Terms of Use. Please email api@yelp.com with questions.
* Don’t make scheduled or batch calls to the Yelp API without written authorization from Yelp. API calls should only be generated at the point of user inquiry.

#### Usage Limitations ####
* Mapbox geocoding API - 600 requests / min for starter. Exceeding these limitations will result in a `429` response.

## Useful Links ##
**Documentation**
* Mapbox - https://www.mapbox.com/api-documentation/
* MDN Documentation on User Location - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
* GeoJSON building tool - http://geojson.io
* Mapbox documentation - https://www.mapbox.com/help/#build-a-web-app
* Mapbox example library - https://www.mapbox.com/mapbox.js/example/v1.0.0/
* Leaflet documentation - http://leafletjs.com/

**JS Libraries**
* Geolocation Fallback (Generally for older browsers) https://github.com/estebanav/javascript-mobile-desktop-geolocation
