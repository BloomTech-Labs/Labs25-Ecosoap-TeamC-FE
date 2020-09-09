import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useQuery, useMutation, gql } from '@apollo/client';
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
  // const [newData, setNewData] = useState(parkData.default.features);
  // console.log("This is newdata! ",newData);
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
      >
        {data &&
          data.records.map(item => (
            <Marker
              key={item.id}
              latitude={item.coordinates.latitude}
              longitude={item.coordinates.longitude}
            >
              <button
                className="marker-btn"
                onClick={e => {
                  e.preventDefault();
                  setSelectedMark(item);
                }}
              >
                {/* <img src="/skateboarding.svg" alt="Skatepark Icon"/> */}
              </button>
            </Marker>
          ))}

        {/* {console.log(parkData.default.features)} */}
        {/* {newData.map((park) => (      
        <Marker
          key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}
          draggable={true}
          // onDrag={(event) => {
          //   // console.log(event.lngLat)
          // }}
          // onDragStart={(event) => {
          //   // console.log("start!!!", event);
          // }}
          onDragEnd={(event) => {
            setNewData(prev => {
              return prev.map(m => 
                m.properties.PARK_ID === park.properties.PARK_ID ? {
                  ...m,
                  geometry: {
                    ...m.geometry, 
                    coordinates: [event.lngLat[0], event.lngLat[1]]
                  }
                } : m
              )
            })
          }}
        >
          <button className="marker-btn" onClick={(e) => {
            e.preventDefault();
            setSelectedMark(park);
          }}>
            <img src="/skateboarding.svg" alt="Skatepark Icon"/>
          </button>
        </Marker>
      ))} */}

        {selectedMark ? (
          <Popup
            latitude={selectedMark.geometry.coordinates[1]}
            longitude={selectedMark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedMark(null);
            }}
          >
            <div>
              <h2>{selectedMark.properties.NAME}</h2>
              <p>{selectedMark.properties.DESCRIPTION}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
