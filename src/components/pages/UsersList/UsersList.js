import React from 'react';
import './UsersList.css';
import logo from '../../../media/eco-soap-logo.png';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USER_QUERY = gql`
  query getUsers {
    users {
      id
      email
      password
    }
  }
`;

const DELETE_ADMIN_MUTATION = gql`
  mutation deleteAdmin($email: String!) {
    deleteUser(input: { email: $email }) {
      user {
        id
        email
        password
      }
    }
  }
`;

const UsersList = () => {
  const [deleteAdmin] = useMutation(DELETE_ADMIN_MUTATION, {
    refetchQueries: ['getUsers'],
  });
  const { loading, error, data } = useQuery(GET_USER_QUERY);
  console.log(error);
  const deleteFunc = (e, email) => {
    e.preventDefault();
    deleteAdmin({
      variables: { email: email },
    });
    console.log(email);
  };

  return (
    <div className="header">
      <div>
        <img className="eco-soap-logo" src={logo} alt="eco-soap bank logo" />
      </div>
      <h1 className="title">Admin Users</h1>
      Go back <Link to="/dashboard">Dashboard</Link>
      <div className="page">
        <div className="users-form">
          {loading && <p>Loading...</p>}
          {error && (
            <p>
              We're experiencing errors with the API! Please come back later.
            </p>
          )}
          {data &&
            data.users.map(({ id, email, password }) => (
              <div className="user-card" key={id}>
                <p>{`User email: ${email}`}</p>
                <p>{`User password: ${password}`}</p>
                <button className="button-modify">Modify</button>
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
