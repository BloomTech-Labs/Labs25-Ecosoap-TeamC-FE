import React, { useState } from 'react';
import './UsersList.css';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
} from '../../users/UserModification.js';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email required')
    .email('Email is required'),
  // PASSWORD RESTRICTIONS: minimum of 8 chars, one uppercase, one lowercase, one digit
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Must Contain 8 Characters, a Uppercase, a Lowercase, and a Number.'
    ),
});

const UsersList = () => {
  // State variables, for Form Modal, and Form State.
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteUserData, setDeleteUserData] = useState({
    email: '',
  });

  // Form Authenticator below
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  // useMutation/useQuery hooks come from ApolloClient, allows us to connect the Front-End with the Backend GraphQL API.
  const [deleteAdmin] = useMutation(DELETE_USER, {
    refetchQueries: ['getUsers'],
  });
  const [editUser] = useMutation(UPDATE_USER, {
    refetchQueries: ['getUsers'],
  });
  const { loading, error, data } = useQuery(GET_USERS);

  // Opens Form Modal
  const onOpenModal = (id, email, password) => {
    setUserInfo({
      id: id,
      email: email,
      password: password,
    });
    setOpen(true);
  };

  // Closes Form Modal
  const onCloseModal = () => {
    setUserInfo({
      id: '',
      email: '',
      password: '',
    });
    setOpen(false);
  };

  // Opens Delete Record Modal
  const onOpenDeleteModal = () => {
    setOpenDelete(true);
  };

  // Closes Delete Record Modal
  const onCloseDeleteModal = () => {
    setOpenDelete(false);
  };

  const onDeleteSubmit = e => {
    e.preventDefault();
    deleteUser({
      variables: { email: deleteUserData },
    });
    onCloseDeleteModal();
  };

  // Handles changes in the form
  const handleChange = event => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const [deleteUser, { mutData3 }] = useMutation(DELETE_USER, {
    refetchQueries: ['getUsers'],
  });

  // Handles the form submit
  const onSubmit = () => {
    editUser({
      variables: {
        userId: userInfo.id,
        email: userInfo.email,
        password: userInfo.password,
      },
    });
    // Line below can be added, if we want to CLOSE the form when Admin updates user, but this will conflict a bit with
    onCloseModal();
  };

  return (
    <div className="user-list-page">
      <h1 className="title">Users</h1>
      <div className="page">
        <div className="users-form">
          {loading && <p>Loading...</p>}
          {error && (
            <p>
              We're experiencing errors with the API! Please come back later.
            </p>
          )}
          <Modal open={open} onClose={onCloseModal} center>
            <h1>Edit user: </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="modify-user-modal"
            >
              <label className="user-update">
                <span>Email:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input
                  placeholder="E-mail*"
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={event => handleChange(event)}
                  ref={register}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </label>
              <br />

              <label className="user-update">
                <span>Password:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input
                  placeholder="Password*"
                  type="text"
                  name="password"
                  value={userInfo.password}
                  onChange={event => handleChange(event)}
                  ref={register}
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </label>
              <br />

              <input
                type="submit"
                className="addWaypointButton"
                value="Update Admin"
              />
            </form>
          </Modal>

          <Modal open={openDelete} onClose={onCloseDeleteModal} center>
            <form
              className="record-modal"
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
          {data &&
            data.users.map(({ id, email, password }) => (
              <div className="user-card" key={id}>
                <p>{`User email: ${email}`}</p>
                <p>{`User password: ${password}`}</p>
                <button
                  onClick={e => onOpenModal(id, email, password)}
                  className="button-modify"
                >
                  Modify
                </button>
                <button
                  className="button-delete"
                  onClick={() => {
                    setDeleteUserData(email);
                    console.log(deleteUserData);
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

export default UsersList;
