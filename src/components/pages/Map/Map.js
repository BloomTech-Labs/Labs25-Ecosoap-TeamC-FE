import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './Map.css';

const REACT_APP_MAPBOX_TOKEN =
  'pk.eyJ1IjoibGFtYmRhbGFiczI1ZWNvc29hcCIsImEiOiJja2VhZWRhOG4wNmU5MnNxZXQ0bmhxZnU3In0.zWyuwunBSy51dulZG9gowQ';

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 15,
    longitude: 55,
    width: '50vw',
    height: '50vh',
    zoom: 2,
  });
  const [selectedMark, setSelectedMark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedMark(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className="mapCSS">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/lambdalabs25ecosoap/ckeaib2n30b4f19mq6mj2dsq3"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      ></ReactMapGL>
    </div>
  );
}

export default Map;
