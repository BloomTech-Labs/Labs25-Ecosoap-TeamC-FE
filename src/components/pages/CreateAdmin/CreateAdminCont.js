import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CreateAdminContainer.css';
import logo from '../../../media/eco-soap-logo.png';
import { useMutation } from '@apollo/client';
import { NEW_USER } from '../../users/UserModification.js';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';

// Email and Password requirement authentications
const schema = yup.object().shape({
  Email: yup
    .string()
    .required('Email required')
    .email('Email is required'),
  // PASSWORD RESTRICTIONS: minimum of 8 chars, one uppercase, one lowercase, one digit
  Password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Must Contain 8 Characters, a Uppercase, a Lowercase, and a Number.'
    ),
});

// The form for creating users
const CreateUserForm = () => {
  // Setting state for Form
  const [data, setData] = useState([
    {
      Email: '',
      Password: '',
    },
  ]);

  // useMutation/useQuery hooks come from ApolloClient, allows us to connect the Front-End with the Backend GraphQL API.
  const [registerNewUser, { mutData }] = useMutation(NEW_USER, {
    refetchQueries: ['getUsers'],
  });
  const { push } = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  // Handles changes in the form
  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  // Handles the form submit
  const onSubmit = () => {
    registerNewUser({
      variables: { email: data.Email, password: data.Password },
    });
    push('/dashboard');
  };

  return (
    <div className="Create-Admin-Page">
      <div className="formContainer">
        <div>
          <img
            className="eco-soap-logo-create"
            src={logo}
            alt="eco-soap bank logo"
          />
        </div>
        <div className="signUpForm">
          <h1 className="title">Create a new User</h1>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label className="emailBox" htmlFor="email">
              <input
                placeholder="E-mail*"
                type="text"
                name="Email"
                onChange={event => handleChange(event)}
                ref={register}
              />
              {errors.Email && <p className="error">{errors.Email.message}</p>}
            </label>
            <label className="passwordBox" htmlFor="password">
              <input
                placeholder="Password*"
                type="text"
                name="Password"
                onChange={event => handleChange(event)}
                ref={register}
              />
              {errors.Password && (
                <p className="error">{errors.Password.message}</p>
              )}
            </label>
            <input
              className="submitButton"
              type="submit"
              value="Create Admin"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
