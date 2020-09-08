import React from 'react';
import './MapManagement.css';

const MapManagement = () => {
  return (
    <div>
      <h1>Map Management</h1>
      <form className="record-form">
        <label className="nameBox">
          <input
            placeholder="Record Name"
            type="text"
            name="record-name"
            // onChange={event => handleChange(event)}
            // ref={register}
          />
        </label>
        <select className="dropdown">
          <option value="Hub">Hub</option>
          <option value="Hotel">Hotel</option>
          <option value="Manufacturing Partner">Manufacturing Partner</option>
        </select>
        <label className="latBox">
          <input
            placeholder="Latitude"
            type="text"
            name="latitude"
            // onChange={event => handleChange(event)}
            // ref={register}
          />
        </label>
        <label className="longBox">
          <input
            placeholder="Longitude"
            type="text"
            name="longitude"
            // onChange={event => handleChange(event)}
            // ref={register}
          />
        </label>
        <button className="button" type="primary"></button>
      </form>
    </div>
  );
};

export default MapManagement;
