import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl';
import { useQuery, useMutation, gql } from '@apollo/client';
import logo from '../../../media/eco-soap-logo.png';
import marker from '../../../media/markerLogo.png';
import './Map.css';
// import * as parkData from "./Skateboard_Parks.json";

const REACT_APP_MAPBOX_TOKEN =
  'pk.eyJ1IjoibGFtYmRhbGFiczI1ZWNvc29hcCIsImEiOiJja2VhZWRhOG4wNmU5MnNxZXQ0bmhxZnU3In0.zWyuwunBSy51dulZG9gowQ';

const GET_RECORDS = gql`
  query getRecords {
    records {
      id
      name
      type {
        name
      }
      coordinates {
        latitude
        longitude
      }
      fields {
        name
        value
      }
    }
  }
`;

function Map() {
  const { loading, error, data } = useQuery(GET_RECORDS);
  const [selectedMark, setSelectedMark] = useState(null);
  // const [newData, setNewData] = useState(parkData.default.features);
  // console.log("This is newdata! ",newData);
  const [viewport, setViewport] = useState({
    latitude: 15,
    longitude: 55,
    width: '50vw',
    height: '50vh',
    zoom: 2,
  });

  // geolocateStyle allows for styling the track-location icon, CSS can't be put in className.
  const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  };

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
      >
        {/* Code snippet below maps over given data making the marker functionality*/}
        {data && console.log('THIS IS DATA: ', data.records)}
        {data &&
          data.records.map(item => (
            <Marker
              key={item.id}
              latitude={item.coordinates.latitude}
              longitude={item.coordinates.longitude}
            >
              <button
                className="marker-button"
                onClick={e => {
                  e.preventDefault();
                  setSelectedMark(item);
                }}
              >
                <img className="marker-logo" src={marker} alt="Logo" />
              </button>
            </Marker>
          ))}
        {/* Code snippet below allows the admin to see their location in the map real-time */}
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {/* Code snippet below allows a user to click on a marker in a map and see info for that marker specifically */}
        {selectedMark ? (
          <Popup
            latitude={selectedMark.coordinates.latitude}
            longitude={selectedMark.coordinates.longitude}
            onClose={() => {
              setSelectedMark(null);
            }}
          >
            <div>
              <h2>{selectedMark.name}</h2>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
