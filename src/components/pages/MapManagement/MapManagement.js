import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useQuery, useMutation } from '@apollo/client';
import {
  NEW_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
  GET_RECORDS,
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
    fields: [{ name: '', value: '' }],
  });

  const [openUpdate, setOpenUpdate] = useState(false);
  const [recordUpdateData, setRecordUpdateData] = useState({
    id: '',
    name: '',
    coordinates: { latitude: 0, longitude: 0 },
    // fields: [],
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
    setRecordData({
      ...recordData,
      [event.target.name]: event.target.value,
    });
  };
  // Handles changes for Latitude specifically
  const handleLatitudeChange = event => {
    setRecordData({
      ...recordData,
      coordinates: {
        latitude: parseFloat(event.target.value),
        longitude: parseFloat(recordData.coordinates.longitude),
      },
      // fields: [],
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
      // fields: [],
    });
  };

  const handleUpdateChange = event => {
    console.log('Record Update Data: ', recordUpdateData);
    setRecordUpdateData({
      ...recordUpdateData,
      [event.target.name]: event.target.value,
    });
  };
  // Handles changes for updating Latitude specifically
  const handleLatitudeUpdateChange = event => {
    setRecordUpdateData({
      ...recordUpdateData,
      coordinates: {
        latitude: parseFloat(event.target.value),
        longitude: parseFloat(recordUpdateData.coordinates.longitude),
      },
      // fields: [],
    });
  };
  // Handles changes for updating Longitude specifically
  const handleLongitudeUpdateChange = event => {
    setRecordUpdateData({
      ...recordUpdateData,
      coordinates: {
        latitude: parseFloat(recordUpdateData.coordinates.latitude),
        longitude: parseFloat(event.target.value),
      },
      // fields: [],
    });
  };

  const onAddSubmit = e => {
    e.preventDefault();
    registerNewRecord({
      variables: {
        name: recordData.name,
        typeId: recordData.typeId,
        coordinates: recordData.coordinates,
        fields: recordData.fields,
      },
    });
    onCloseAddModal();
  };

  const onUpdateSubmit = e => {
    e.preventDefault();
    console.log('THIS IS recordUpdateData', recordUpdateData);
    updateRecord({
      variables: {
        id: recordUpdateData.id,
        name: recordUpdateData.name,
        coordinates: {
          latitude: recordUpdateData.coordinates.latitude,
          longitude: recordUpdateData.coordinates.longitude,
        },
        fields: recordUpdateData.fields,
      },
    });
    onCloseUpdateModal();
  };

  const onDeleteSubmit = e => {
    e.preventDefault();
    deleteRecord({
      variables: { id: deleteRecordData.id },
    });
    onCloseDeleteModal();
  };

  const { data: queryData } = useQuery(GET_TYPES);
  const { loading, error, data: recordQuery } = useQuery(GET_RECORDS);

  const [registerNewRecord, { mutData }] = useMutation(NEW_RECORD, {
    refetchQueries: ['getRecords'],
  });
  const [updateRecord, { mutData2 }] = useMutation(UPDATE_RECORD, {
    refetchQueries: ['getRecords'],
  });
  const [deleteRecord, { mutData3 }] = useMutation(DELETE_RECORD, {
    refetchQueries: ['getRecords'],
  });

  return (
    <div className="Map-Man-Page">
      <h1>Map Management</h1>
      {/* Modal for adding a new record */}
      <Modal open={openAdd} onClose={onCloseAddModal} center>
        <form
          className="waypointAddForm"
          onSubmit={e => {
            onAddSubmit(e);
          }}
        >
          <h3 className="title">Add Record</h3>
          <label className="FirstAddInput">
            <input
              placeholder="Location Name"
              type="text"
              name="name"
              onChange={event => handleChange(event)}
            />
          </label>
          <select
            className="dropdown"
            name="typeId"
            onChange={event => handleChange(event)}
          >
            <option label="Select a type:" />
            {queryData &&
              queryData.types.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
          </select>
          <label className="FirstAddInput">
            <input
              placeholder="Latitude"
              type="float"
              name="latitude"
              onChange={event => handleLatitudeChange(event)}
            />
          </label>
          <label className="FirstAddInput">
            <input
              placeholder="Longitude"
              type="float"
              name="longitude"
              onChange={event => handleLongitudeChange(event)}
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
          <h3 className="title">Update Record</h3>
          <label className="FirstUpdateInput">
            <input
              placeholder="Location ID"
              type="text"
              name="id"
              value={recordUpdateData.id}
              onChange={event => handleUpdateChange(event)}
            />
          </label>
          <label className="FirstUpdateInput">
            <input
              placeholder="Location Name"
              type="text"
              name="name"
              value={recordUpdateData.name}
              onChange={event => handleUpdateChange(event)}
            />
          </label>
          <label className="FirstUpdateInput">
            <input
              placeholder="Longitude"
              type="text"
              name="longitude"
              value={recordUpdateData.coordinates.longitude}
              onChange={event => handleLongitudeUpdateChange(event)}
            />
          </label>
          <label className="FirstUpdateInput">
            <input
              placeholder="Latitude"
              type="text"
              name="latitude"
              value={recordUpdateData.coordinates.latitude}
              onChange={event => handleLatitudeUpdateChange(event)}
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
          <h3 className="title">Delete Record</h3>
          <h1>Are you sure you want to delete this record?</h1>
          <button className="waypointButton" type="submit">
            Yes
          </button>
          <button className="waypointButton">No</button>
        </form>
      </Modal>
      <button onClick={e => onOpenAddModal()} className="button-modify-new">
        Add New Record
      </button>
      <div className="records-form">
        {loading && <p>Loading...</p>}
        {error && (
          <p>We're experiencing errors with the API! Please come back later.</p>
        )}
        {recordQuery &&
          recordQuery.records.map(record => (
            <div className="record-card" key={record.id}>
              <p>{`Type ID: ${record.id}`}</p>
              <p>{`Record Name: ${record.name}`}</p>
              <p>{`Type: ${record.type.name}`}</p>
              <p>{`Coordinates (Long/Lat): ${record.coordinates.longitude}, ${record.coordinates.latitude}`}</p>
              <button
                className="button-modify"
                onClick={e => {
                  onOpenUpdateModal();
                  setRecordUpdateData(record);
                }}
              >
                Modify
              </button>
              <button
                className="button-delete"
                onClick={e => {
                  onOpenDeleteModal();
                  setDeleteRecordData({ id: record.id });
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MapManagement;
