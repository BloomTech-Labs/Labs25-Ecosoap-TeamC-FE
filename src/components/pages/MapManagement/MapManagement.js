import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  NEW_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
} from '../../records/RecordModification.js';
import { GET_TYPES } from '../../types/TypeModification.js';

import 'react-responsive-modal/styles.css';
import './MapManagement.css';

const MapManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [recordData, setRecordData] = useState({
    name: '',
    typeId: '',
    coordinates: { latitude: 0, longitude: 0 },
    fields: [],
  });

  const [openUpdate, setOpenUpdate] = useState(false);
  const [recordUpdateData, setRecordUpdateData] = useState({
    id: '',
    name: '',
    coordinates: { latitude: 0, longitude: 0 },
    fields: [],
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteRecordData, setDeleteRecordData] = useState({
    id: '',
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
  // Handles changes for Latitude specifically
  const handleLatitudeChange = event => {
    console.log('handleLatitudeChange: ', recordData);
    setRecordData({
      ...recordData,
      coordinates: {
        latitude: parseFloat(event.target.value),
        longitude: parseFloat(recordData.coordinates.longitude),
      },
      fields: [],
    });
  };
  // Handles changes for Longitude specifically
  const handleLongitudeChange = event => {
    setRecordData({
      ...recordData,
      coordinates: {
        latitude: parseFloat(recordData.coordinates.latitude),
        longitude: parseFloat(event.target.value),
      },
      fields: [],
    });
  };

  const handleUpdateChange = event => {
    console.log(recordUpdateData);
    setRecordUpdateData({
      ...recordUpdateData,
      [event.target.name]: event.target.value,
    });
  };
  // Handles changes for Latitude specifically
  const handleLatitudeUpdateChange = event => {
    console.log('handleLatitudeChange: ', recordUpdateData);
    setRecordUpdateData({
      ...recordUpdateData,
      coordinates: {
        latitude: parseFloat(event.target.value),
        longitude: parseFloat(recordUpdateData.coordinates.longitude),
      },
      fields: [],
    });
  };
  // Handles changes for Longitude specifically
  const handleLongitudeUpdateChange = event => {
    setRecordUpdateData({
      ...recordUpdateData,
      coordinates: {
        latitude: parseFloat(recordUpdateData.coordinates.latitude),
        longitude: parseFloat(event.target.value),
      },
      fields: [],
    });
  };

  const handleDeleteChange = event => {
    console.log(deleteRecordData);
    setDeleteRecordData({
      ...deleteRecordData,
      [event.target.name]: event.target.value,
    });
  };

  const onAddSubmit = e => {
    e.preventDefault();
    console.log('This is record data: ', recordData);
    registerNewRecord({
      variables: {
        name: recordData.name,
        typeId: recordData.typeId,
        coordinates: recordData.coordinates,
        fields: recordData.fields,
      },
    });

    // Line below can be added, if we want to CLOSE the form when Admin updates user, but this will conflict a bit with
    onCloseAddModal();
  };

  const onUpdateSubmit = e => {
    e.preventDefault();
    console.log('This is record data: ', recordUpdateData);
    updateRecord({
      variables: {
        id: recordUpdateData.id,
        name: recordUpdateData.name,
        coordinates: recordUpdateData.coordinates,
        fields: recordUpdateData.fields,
      },
    });

    // Line below can be added, if we want to CLOSE the form when Admin updates user, but this will conflict a bit with
    onCloseUpdateModal();
  };

  const onDeleteSubmit = e => {
    e.preventDefault();
    console.log('This is record data: ', deleteRecordData);
    deleteRecord({
      variables: { id: deleteRecordData.id },
    });

    // Line below can be added, if we want to CLOSE the form when Admin updates user, but this will conflict a bit with
    onCloseDeleteModal();
  };
  const { loading, error, data } = useQuery(GET_TYPES);
  console.log(data);
  const [registerNewRecord, { mutData }] = useMutation(NEW_RECORD, {
    refetchQueries: ['getTypes'],
  });
  const [updateRecord, { mutData2 }] = useMutation(UPDATE_RECORD);
  const [deleteRecord, { mutData3 }] = useMutation(DELETE_RECORD);

  return (
    <div>
      <h1>Map Management</h1>
      {/* Modal for adding a new record */}
      <Modal open={openAdd} onClose={onCloseAddModal} center>
        <form
          className="waypointAddForm"
          onSubmit={e => {
            onAddSubmit(e);
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
            name="typeId"
            onChange={event => handleChange(event)}
          >
            <option label="Select a type:" />
            {data &&
              data.types.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
          </select>
          <label className="FirstAddInput">
            <input
              placeholder="Latitude"
              type="float"
              name="latitude"
              onChange={event => handleLatitudeChange(event)}
              // ref={register}
            />
          </label>
          <label className="FirstAddInput">
            <input
              placeholder="Longitude"
              type="float"
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

      {/* Modal for updating a record */}
      <Modal open={openUpdate} onClose={onCloseUpdateModal} center>
        <form
          className="waypointUpdateForm"
          onSubmit={e => {
            onUpdateSubmit(e);
          }}
        >
          <h3>Update Record</h3>
          <label className="FirstUpdateInput">
            <input
              placeholder="Location ID"
              type="text"
              name="id"
              onChange={event => handleUpdateChange(event)}
              // ref={register}
            />
          </label>
          <label className="FirstUpdateInput">
            <input
              placeholder="Location Name"
              type="text"
              name="name"
              onChange={event => handleUpdateChange(event)}
              // ref={register}
            />
          </label>
          <label className="FirstUpdateInput">
            <input
              placeholder="Latitude"
              type="text"
              name="latitude"
              onChange={event => handleLatitudeUpdateChange(event)}
              // ref={register}
            />
          </label>
          <label className="FirstUpdateInput">
            <input
              placeholder="Longitude"
              type="text"
              name="longitude"
              onChange={event => handleLongitudeUpdateChange(event)}
              // ref={register}
            />
          </label>
          <button className="waypointButton" type="submit">
            {' '}
            Update Record
          </button>
        </form>
      </Modal>

      {/* Modal for deleting a record */}
      <Modal open={openDelete} onClose={onCloseDeleteModal} center>
        <form
          className="waypointDeleteForm"
          onSubmit={e => {
            onDeleteSubmit(e);
          }}
        >
          <h3>Delete Record</h3>
          <label className="FirstDeleteInput">
            <input
              placeholder="Location to delete"
              type="text"
              name="id"
              onChange={event => handleDeleteChange(event)}
              // ref={register}
            />
          </label>
          <button className="waypointButton" type="submit">
            {' '}
            Delete Record
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
      <p className="goBackLink">
        Back to <Link to="/dashboard">Dashboard</Link>
      </p>
    </div>
  );
};

export default MapManagement;
