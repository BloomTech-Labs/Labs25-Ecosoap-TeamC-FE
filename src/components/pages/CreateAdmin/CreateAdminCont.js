import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import './CreateAdminContainer.css';
import { useQuery, useMutation, gql } from '@apollo/client';
// import { connect } from 'react-redux';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail is required')
    .email('YOU NEED ZE @!'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const query1 = gql`
  {
    users {
      id
      email
      password
    }
  }
`;

const mutation1 = gql`
  mutation registerNewUser {
    register(input: { email: $email, password: $password }) {
      user {
        id
        email
        password
      }
    }
  }
`;

function GetUsers() {
  const { loading, error, data } = useQuery(query1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return data.users.map(({ id, email, password }) => (
    <div key={id}>
      <p>{`${email}: ${password}`}</p>
    </div>
  ));
}

const SignInForm = props => {
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
    // push("/dashboard");
    e.preventDefault();
    registerNewUser({
      variables: { email: data.eMail, password: data.passWord },
    });
    console.log(data.eMail, data.passWord);
  };

  return (
    <div className="formContainer">
      <div>
        <img
          className="eco-soap-logo"
          src="data:image/png;base64,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"
          /* src url comes from current Eco-Soap Bank Website. A permanent solution should be aquired at some point */
          alt="eco-soap bank logo"
        />
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
              type="text"
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
          {/* Code below will go into function once we get a dashboard setup. */}
          {/* <p>Go back <Link to="/dashboard">Login</Link></p> */}
          <input className="submitButton" type="submit" value="Create Admin" />
        </form>

        {/* <GetUsers /> */}
      </div>
    </div>
  );
};

export default SignInForm;
