import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Map from '../Map/Map';
import './MapManagement.css';

const MapManagement = () => {
  const [open, setOpen] = useState(false);
  const [waypointData, setWaypointData] = useState('');

  // Opens Form Modal
  const onOpenModal = () => {
    // setUserInfo({
    //   id: id,
    //   email: email,
    //   password: password,
    // });
    setOpen(true);
  };

  // Closes Form Modal
  const onCloseModal = () => {
    // setUserInfo({
    //   id: '',
    //   email: '',
    //   password: '',
    // });
    setOpen(false);
  };

  const handleChange = event => {
    setWaypointData({
      ...waypointData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Map Management</h1>
      <Modal open={open} onClose={onCloseModal} center>
        <form className="waypointForm">
          <label className="labelInFirstForm">
            <input
              placeholder="Location Name"
              type="text"
              name="location-name"
              onChange={event => handleChange(event)}
              // ref={register}
            />
          </label>
          <select className="dropdown">
            <optgroup label="Select a type:">
              <option value="Hub">Hub</option>
              <option value="Hotel">Hotel</option>
              <option value="Manufacturing Partner">
                Manufacturing Partner
              </option>
            </optgroup>
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
