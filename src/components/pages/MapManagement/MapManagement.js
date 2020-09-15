import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useQuery, useMutation, gql } from '@apollo/client';
import { NEW_RECORD } from '../../records/RecordModification.js';
import Map from '../Map/Map';
import './MapManagement.css';

// let fieldValues = values.fields ? inspect(values.fields).split("'").join('"') : "[]";

// let NEW_RECORD_MUT = gql`
//   mutation registerNewRecord {
//     createRecord(
//       input: {
//         typeId: "Factory"
//         name: "Chocolate Factory"
//         coordinates: { latitude: 11.67, longitude: -20.11 }
//         fields: "[]"
//       }
//     ) {
//       record {
//         id
//         name
//         coordinates {
//           latitude
//           longitude
//         }
//       }
//     }
//   }
// `;

const MapManagement = () => {
  const [open, setOpen] = useState(false);
  const [recordData, setRecordData] = useState('');

  // Opens Form Modal
  const onOpenModal = () => {
    setOpen(true);
  };

  // Closes Form Modal
  const onCloseModal = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setRecordData({
      ...recordData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('This is record data: ', recordData);

    // Line below can be added, if we want to CLOSE the form when Admin updates user, but this will conflict a bit with
    onCloseModal();
  };

  const [registerNewRecord, { mutData }] = useMutation(NEW_RECORD);

  return (
    <div>
      <button
        onClick={e => {
          e.preventDefault();
          console.log('hello');
          registerNewRecord();
        }}
      >
        Submit Record
      </button>
      <h1>Map Management</h1>
      <Modal open={open} onClose={onCloseModal} center>
        <form
          className="waypointForm"
          onSubmit={e => {
            onSubmit(e);
          }}
        >
          <label className="labelInFirstForm">
            <input
              placeholder="Location Name"
              type="text"
              name="location-name"
              onChange={event => handleChange(event)}
              // ref={register}
            />
          </label>
          <select
            className="dropdown"
            name="location-type"
            onChange={event => handleChange(event)}
          >
            <option label="Select a type:" />
            <option value="Hub">Hub</option>
            <option value="Hotel">Hotel</option>
            <option value="Manufacturing Partner">Manufacturing Partner</option>
          </select>
          <label className="labelInFirstForm">
            <input
              placeholder="Latitude"
              type="text"
              name="latitude"
              onChange={event => handleChange(event)}
              // ref={register}
            />
          </label>
          <label className="labelInFirstForm">
            <input
              placeholder="Longitude"
              type="text"
              name="longitude"
              onChange={event => handleChange(event)}
              // ref={register}
            />
          </label>
          <button className="waypointButton" type="submit">
            {' '}
            Submit new location
          </button>
        </form>
      </Modal>
      <button onClick={e => onOpenModal()} className="button-modify">
        Add new Location
      </button>
      <div className="mapInManagement">
        <Map />
      </div>
      <p className="goBackLink">
        Back to <Link to="/dashboard">Dashboard</Link>
      </p>
    </div>
  );
};

export default MapManagement;
