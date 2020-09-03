import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibGFtYmRhbGFiczI1ZWNvc29hcCIsImEiOiJja2VhZWRhOG4wNmU5MnNxZXQ0bmhxZnU3In0.zWyuwunBSy51dulZG9gowQ';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 64.0625,
      lat: 6.8197,
      zoom: 2,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    var map = new mapboxgl.Map({
      container: 'map',
      center: [lng, lat],
      style: 'mapbox://styles/lambdalabs25ecosoap/ckeaib2n30b4f19mq6mj2dsq3',
      zoom: zoom,
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div className="eco-soap-map">
        <div id="map" />
        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
      </div>
    );
  }
}

export default Map;
