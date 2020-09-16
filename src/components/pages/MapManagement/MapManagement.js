import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useQuery, useMutation, gql } from '@apollo/client';
import { NEW_RECORD } from '../../records/RecordModification.js';
import Map from '../Map/Map';
import './MapManagement.css';

const MapManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [recordData, setRecordData] = useState({
    name: '',
    type: '',
    coordinates: { latitude: 0, longitude: 0 },
  });

  // Opens Add Record Modal
  const onOpenAddModal = () => {
    setOpenAdd(true);
  };

  // Closes Add Record Modal
  const onCloseAddModal = () => {
    setOpenAdd(false);
  };

  // Opens Update Record Modal
  const onOpenUpdateModal = () => {
    setOpenUpdate(true);
  };

  // Closes Update Record Modal
  const onCloseUpdateModal = () => {
    setOpenUpdate(false);
  };

  // Opens Delete Record Modal
  const onOpenDeleteModal = () => {
    setOpenDelete(true);
  };

  // Closes Delete Record Modal
  const onCloseDeleteModal = () => {
    setOpenDelete(false);
  };

  const handleChange = event => {
    console.log(recordData);
    setRecordData({
      ...recordData,
      [event.target.name]: event.target.value,
    });
  };
  const handleLatitudeChange = event => {
    console.log('handleLatitudeChange: ', recordData);
    setRecordData({
      ...recordData,
      coordinates: {
        latitude: event.target.value,
        longitude: parseFloat(recordData.coordinates.longitude),
      },
    });
  };
  const handleLongitudeChange = event => {
    setRecordData({
      ...recordData,
      coordinates: {
        latitude: recordData.coordinates.latitude,
        longitude: event.target.value,
      },
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('This is record data: ', recordData);

    // Line below can be added, if we want to CLOSE the form when Admin updates user, but this will conflict a bit with
    onCloseAddModal();
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
      <Modal open={openAdd} onClose={onCloseAddModal} center>
        <form
          className="waypointAddForm"
          onSubmit={e => {
            onSubmit(e);
          }}
        >
          <h3>Add Record</h3>
          <label className="FirstAddInput">
            <input
              placeholder="Location Name"
              type="text"
              name="name"
              onChange={event => handleChange(event)}
              // ref={register}
            />
          </label>
          <select
            className="dropdown"
            name="type"
            onChange={event => handleChange(event)}
          >
            <option label="Select a type:" />
            <option value="Hub">Hub</option>
            <option value="Hotel">Hotel</option>
            <option value="Manufacturing Partner">Manufacturing Partner</option>
          </select>
          <label className="FirstAddInput">
            <input
              id="number"
              placeholder="Latitude"
              type="number"
              name="latitude"
              onChange={event => handleLatitudeChange(event)}
              // ref={register}
            />
          </label>
          <label className="FirstAddInput">
            <input
              id="number"
              placeholder="Longitude"
              type="number"
              name="longitude"
              onChange={event => handleLongitudeChange(event)}
              // ref={register}
            />
          </label>
          <button className="waypointButton" type="submit">
            {' '}
            Submit new location
          </button>
        </form>
      </Modal>

      <Modal open={openUpdate} onClose={onCloseUpdateModal} center>
        <form
          className="waypointUpdateForm"
          onSubmit={e => {
            onSubmit(e);
          }}
        >
          <h3>Update Record</h3>
          <label className="FirstUpdateInput">
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
          <label className="FirstUpdateInput">
            <input
              placeholder="Latitude"
              type="text"
              name="latitude"
              onChange={event => handleChange(event)}
              // ref={register}
            />
          </label>
          <label className="FirstUpdateInput">
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

      <Modal open={openDelete} onClose={onCloseDeleteModal} center>
        <form
          className="waypointDeleteForm"
          onSubmit={e => {
            onSubmit(e);
          }}
        >
          <h3>Delete Record</h3>
          <label className="FirstDeleteInput">
            <input
              placeholder="Location to delete"
              type="text"
              name="location-name"
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
      <button onClick={e => onOpenAddModal()} className="button-modify">
        Add New Record
      </button>
      <button onClick={e => onOpenUpdateModal()} className="button-modify">
        Update Existing Record
      </button>
      <button onClick={e => onOpenDeleteModal()} className="button-modify">
        Delete Record
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
