import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  GET_TYPES,
  ADD_TYPE,
  UPDATE_TYPE,
  DELETE_TYPE,
} from '../../types/TypeModification';
import { Modal } from 'react-responsive-modal';
import './TypeManagement.css';

const TypeManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [typeData, setTypeData] = useState({
    name: '',
    fields: [],
  });

  const [openUpdate, setOpenUpdate] = useState(false);
  const [typeUpdateData, setTypeUpdateData] = useState({
    name: '',
    fields: [],
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

  const handleDeleteChange = event => {
    console.log(deleteTypeData);
    setDeleteTypeData({
      ...deleteTypeData,
      [event.target.name]: event.target.value,
    });
  };

  const onAddSubmit = e => {
    e.preventDefault();
    console.log('This is type data: ', typeData);
    createNewType({
      variables: {
        name: typeData.name,
        fields: typeData.fields,
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
        fields: typeUpdateData.fields,
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

  const [createNewType, { mutData }] = useMutation(ADD_TYPE);
  const [updateType, { mutData2 }] = useMutation(UPDATE_TYPE);
  const [deleteType, { mutData3 }] = useMutation(DELETE_TYPE);

  return (
    <div>
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
            <input
              placeholder="Type ID"
              type="text"
              name="id"
              onChange={event => handleUpdateChange(event)}
              // ref={register}
            />
          </label>
          <label className="FirstUpdateInput">
            <input
              placeholder="Type Name"
              type="text"
              name="name"
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
          className="DeleteForm"
          onSubmit={e => {
            onDeleteSubmit(e);
          }}
        >
          <h3>Delete Type</h3>
          <label className="DeleteInput">
            <input
              placeholder="Type ID to Delete"
              type="text"
              name="id"
              onChange={event => handleDeleteChange(event)}
              // ref={register}
            />
          </label>
          <button className="typeButton" type="submit">
            {' '}
            Delete Type
          </button>
        </form>
      </Modal>
      <button onClick={e => onOpenAddModal()} className="button-modify">
        Add New Type
      </button>
      <button onClick={e => onOpenUpdateModal()} className="button-modify">
        Update Existing Type
      </button>
      <button onClick={e => onOpenDeleteModal()} className="button-modify">
        Delete Type
      </button>
    </div>
  );
};

export default TypeManagement;
