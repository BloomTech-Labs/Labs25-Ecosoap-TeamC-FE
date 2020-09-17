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
  const [typeData, setTypeData] = useState({
    name: '',
    fields: [],
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTypeData, setDeleteTypeData] = useState({
    id: '',
  });

  const onOpenDeleteModal = () => {
    setOpenDelete(true);
  };

  // Closes Delete Record Modal
  const onCloseDeleteModal = () => {
    setOpenDelete(false);
  };

  const handleDeleteChange = event => {
    console.log(deleteTypeData);
    setDeleteTypeData({
      ...deleteTypeData,
      [event.target.name]: event.target.value,
    });
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
              placeholder="Type to Delete"
              type="text"
              name="id"
              onChange={event => handleDeleteChange(event)}
              // ref={register}
            />
          </label>
          <button className="typeButton" type="submit">
            {' '}
            Delete Record
          </button>
        </form>
      </Modal>
      {/* <button onClick={e => onOpenAddModal()} className="button-modify">
                Add New Record
            </button>
            <button onClick={e => onOpenUpdateModal()} className="button-modify">
                Update Existing Record
            </button> */}
      <button onClick={e => onOpenDeleteModal()} className="button-modify">
        Delete Type
      </button>
    </div>
  );
};

export default TypeManagement;
