import React, { useState } from 'react';
import './UsersList.css';
import { useQuery, useMutation, gql } from '@apollo/client';
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
  const deleteFunc = (e, email) => {
    e.preventDefault();
    deleteAdmin({
      variables: { email: email },
    });
  };

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

  // Handles changes in the form
  const handleChange = event => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
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

              <label>
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

              <input type="submit" value="Update Admin" />
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
                  onClick={e => deleteFunc(e, email)}
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
