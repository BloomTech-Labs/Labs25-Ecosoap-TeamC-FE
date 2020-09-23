import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useQuery } from '@apollo/client';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import PopUpBar from '../..//PopUpBar/PopUpBar';
import { GET_RECORDS } from '../../records/RecordModification.js';

import icon from '../../../media/eco-soap-logo.png';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibGFtYmRhbGFiczI1ZWNvc29hcCIsImEiOiJja2VhZWRhOG4wNmU5MnNxZXQ0bmhxZnU3In0.zWyuwunBSy51dulZG9gowQ';

function Map() {
  const [currentMarker, setCurrentMarker] = useState(false);
  const { data } = useQuery(GET_RECORDS);

  useEffect(() => {
    // Snippet below is to initialize the map
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/lambdalabs25ecosoap/ckeaib2n30b4f19mq6mj2dsq3', // stylesheet location
      center: [35, 25], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });

    /*-------------- Inside Search-Bar functionality START --------------*/
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    /*-------------- Inside Search-Bar functionality END --------------*/

    /*-------------- Outside Search-Bar functionality START --------------*/
    // var geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl,
    // });
    // geocoder.onAdd(map);
    // geocoder.addTo('.geocoder');
    /*-------------- Outside Search-Bar functionality END --------------*/

    /*-------------- Track user functionality START --------------*/
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    /*-------------- Track user functionality END --------------*/

    function flyToPoint(marker) {
      map.flyTo({
        center: [marker.coordinates.longitude, marker.coordinates.latitude],
        zoom: 6,
      });
    }

    data &&
      data.records.forEach(marker => {
        // console.log('map records: ', data.records);
        var el = document.createElement('img');
        el.src = icon;
        el.className = 'markerStyles';
        el.onclick = () => {
          // console.log("hi ", marker.name);
          setCurrentMarker(marker);
          flyToPoint(marker);
        };
        var popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.name);

        // var marker = new mapboxgl.Marker()     // Substitue for line below if we try adding icons.
        new mapboxgl.Marker({ color: 'red', element: el })
          // .setDraggable(true) allows for easy draggable markers
          .setPopup(popup)
          .setLngLat([
            marker.coordinates.longitude,
            marker.coordinates.latitude,
          ]) // [lng, lat]
          .addTo(map);
      });
  }, [data]);

  return (
    <>
      {/* <div className="geocoder" /> */}
      <div id="map" />
      <PopUpBar recordData={currentMarker} />
    </>
  );
}

export default Map;
