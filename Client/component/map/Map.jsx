var defaultCoord = [37.7837008, -122.4111551];

L.mapbox.accessToken = 'pk.eyJ1Ijoicm1jY2hlc24iLCJhIjoiY2lxbHkxbXFiMDA5dWZubm5mNWkwdGYwbiJ9.QC1lP-2tNymbJ5tHaMugZw';

var Map = React.createClass({
  componentDidMount() {
    this.map = L.mapbox.map('map-one', 'mapbox.streets').setView(defaultCoord, 14);
  },

  render() {
    return (
      <div className='map' id='map-one'></div>
    );
  }
});


window.Map = Map;
