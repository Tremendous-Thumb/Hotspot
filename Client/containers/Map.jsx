L.mapbox.accessToken = 'pk.eyJ1Ijoicm1jY2hlc24iLCJhIjoiY2lxbHkxbXFiMDA5dWZubm5mNWkwdGYwbiJ9.QC1lP-2tNymbJ5tHaMugZw';
import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.map = L.mapbox.map('map-one', 'mapbox.streets').setView([38.8929, -77.0252], 14);
  }

  render() {
    return (
      <div className='map' id='map-one'></div>
    );
  }
}


export default Map;
