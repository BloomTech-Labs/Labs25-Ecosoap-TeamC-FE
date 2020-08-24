import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CreateAdminContainer.css';
import logo from '../../../media/eco-soap-logo.png';
import { useMutation, gql } from '@apollo/client';

const mutation1 = gql`
  mutation registerNewUser($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      user {
        id
        email
        password
      }
    }
  }
`;
// TODO: PASSWORD RESTRICTIONS: minimum of 8 chars, one uppercase, one lowercase, one digit
const SignInForm = () => {
  const [registerNewUser, { mutData }] = useMutation(mutation1);
  const { push } = useHistory();

  const [data, setData] = useState([
    {
      eMail: '',
      passWord: '',
    },
  ]);

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    console.log(data);
  };

  const onSubmit = e => {
    // props.addNewAdmin(data);
    push('/dashboard');
    e.preventDefault();
    registerNewUser({
      variables: { email: data.eMail, password: data.passWord },
    });
    console.log(data.eMail, data.passWord);
  };

  return (
    <div className="formContainer">
      <div>
        <img className="eco-soap-logo" src={logo} alt="eco-soap bank logo" />
      </div>
      <div className="signUpForm">
        <h1 className="title">Create a New Admin</h1>

        <form
          className="form"
          onSubmit={e => {
            onSubmit(e);
          }}
        >
          <label className="emailBox" htmlFor="email">
            <input
              className="email"
              placeholder="E-mail*"
              type="email"
              name="eMail"
              onChange={event => handleChange(event)}
            />
          </label>
          <label className="passwordBox" htmlFor="password">
            <input
              className="password"
              placeholder="Password*"
              type="text"
              name="passWord"
              onChange={event => handleChange(event)}
            />
          </label>
          <input className="submitButton" type="submit" value="Create Admin" />
          <p className="goBackInCreate">
            Go back <Link to="/dashboard">Dashboard</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
