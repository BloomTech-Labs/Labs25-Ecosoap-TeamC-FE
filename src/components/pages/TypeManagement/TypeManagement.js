import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_TYPES,
  ADD_TYPE,
  UPDATE_TYPE,
  DELETE_TYPE,
} from '../../types/TypeModification';
import { Modal } from 'react-responsive-modal';
import './TypeManagement.css';

const TypeManagement = () => {
  const { loading, error, data } = useQuery(GET_TYPES);
  const [openAdd, setOpenAdd] = useState(false);
  const [typeData, setTypeData] = useState({
    id: '',
    name: '',
  });

  const [openUpdate, setOpenUpdate] = useState(false);
  const [typeUpdateData, setTypeUpdateData] = useState({
    id: '',
    name: [],
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTypeData, setDeleteTypeData] = useState({
    id: '',
  });

  const onOpenAddModal = () => {
    setOpenAdd(true);
  };

  // Closes Add Type Modal
  const onCloseAddModal = () => {
    setOpenAdd(false);
  };

  // Opens Update Type Modal
  const onOpenUpdateModal = () => {
    setOpenUpdate(true);
  };

  // Closes Update Type Modal
  const onCloseUpdateModal = () => {
    setOpenUpdate(false);
  };

  // Opens Delete Type Modal
  const onOpenDeleteModal = () => {
    setOpenDelete(true);
  };

  // Closes Delete Type Modal
  const onCloseDeleteModal = () => {
    setOpenDelete(false);
  };

  const handleChange = event => {
    console.log(typeData);
    setTypeData({
      ...typeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateChange = event => {
    console.log(typeUpdateData);
    setTypeUpdateData({
      ...typeUpdateData,
      [event.target.name]: event.target.value,
    });
  };
  const onAddSubmit = e => {
    e.preventDefault();
    console.log('This is type data: ', typeData);
    createNewType({
      variables: {
        id: typeData.id,
        name: typeData.name,
        fields: [],
        records: [],
      },
    });
    onCloseAddModal();
  };

  const onUpdateSubmit = e => {
    e.preventDefault();
    console.log('This is type data: ', typeUpdateData);
    updateType({
      variables: {
        id: typeUpdateData.id,
        name: typeUpdateData.name,
        fields: [],
        records: [],
      },
    });
    onCloseUpdateModal();
  };

  const onDeleteSubmit = e => {
    e.preventDefault();
    console.log('This is type data: ', deleteTypeData);
    deleteType({
      variables: { id: deleteTypeData.id },
    });
    onCloseDeleteModal();
  };

  const [createNewType, { mutData }] = useMutation(ADD_TYPE, {
    refetchQueries: ['getTypes'],
  });
  const [updateType, { mutData2 }] = useMutation(UPDATE_TYPE, {
    refetchQueries: ['getTypes'],
  });
  const [deleteType, { mutData3 }] = useMutation(DELETE_TYPE, {
    refetchQueries: ['getTypes'],
  });

  return (
    <div className="Type-Man-Page">
      {loading && <p>Loading...</p>}
      {error && (
        <p>We're experiencing errors with the API! Please come back later.</p>
      )}
      <h1>Types</h1>
      <Modal open={openAdd} onClose={onCloseAddModal} center>
        <form
          className="typeAddForm"
          onSubmit={e => {
            onAddSubmit(e);
          }}
        >
          <h3>Add Type</h3>
          <label className="FirstAddInput">
            <span>Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input
              placeholder="Type Name"
              type="text"
              name="name"
              onChange={event => handleChange(event)}
              // ref={register}
            />
          </label>
          <button className="waypointButton" type="submit">
            {' '}
            Submit new type
          </button>
        </form>
      </Modal>
      {/* Modal for updating a type */}
      <Modal open={openUpdate} onClose={onCloseUpdateModal} center>
        <form
          className="typeUpdateForm"
          onSubmit={e => {
            onUpdateSubmit(e);
          }}
        >
          <h3>Update Type</h3>
          <label className="FirstUpdateInput">
            <span>Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input
              placeholder="Type Name"
              type="text"
              name="name"
              value={typeUpdateData.name}
              onChange={event => handleUpdateChange(event)}
              // ref={register}
            />
          </label>
          <button className="waypointButton" type="submit">
            {' '}
            Update Type
          </button>
        </form>
      </Modal>

      <Modal open={openDelete} onClose={onCloseDeleteModal} center>
        <form
          className="delete-modal"
          onSubmit={e => {
            onDeleteSubmit(e);
          }}
        >
          <h3 className="title">Delete Record</h3>
          <h1>Are you sure you want to delete this record?</h1>
          <button className="y-n-del-button" id="yesButton" type="submit">
            Yes
          </button>
          <button className="y-n-del-button">No</button>
        </form>
      </Modal>

      <button onClick={e => onOpenAddModal()} className="button-add-type">
        Add New Type
      </button>
      <div className="page">
        <div className="types-form">
          {loading && <p>Loading...</p>}
          {error && (
            <p>
              We're experiencing errors with the API! Please come back later.
            </p>
          )}
          {data &&
            data.types.map(type => (
              <div className="type-card" key={type.id}>
                <p>{`Type ID: ${type.id}`}</p>
                <p>{`Type Name: ${type.name}`}</p>
                <button
                  onClick={() => {
                    console.log('THISIS TYPE', type);
                    setTypeUpdateData(type);
                    onOpenUpdateModal();
                  }}
                  className="button-modify"
                >
                  Modify
                </button>
                <button
                  className="button-delete"
                  onClick={() => {
                    setDeleteTypeData(type);
                    console.log(deleteTypeData);
                    onOpenDeleteModal();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TypeManagement;
