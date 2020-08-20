import React, { useState, useEffect } from 'react';
import './UsersList.css';
import logo from '../../../media/eco-soap-logo.png';
import { useQuery, useMutation, gql } from '@apollo/client';

const query1 = gql`
  {
    users {
      id
      email
      password
    }
  }
`;

const deleteAdmin = gql`
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
  const [deleteUser, { mutData }] = useMutation(deleteAdmin);
  const [userData, setUserData] = useState();

  useEffect(() => {}, [userData]);

  function GetUsers() {
    const { loading, error, data } = useQuery(query1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    setUserData(data.users);
    console.log(userData);
    // console.log("This is DATA! ", data.users)

    return data.users.map(({ id, email, password }) => (
      <div className="user-card" key={id}>
        <p>{`This is email: ${email}`}</p>
        <p>{`This is password: ${password}`}</p>
        <button className="button-modify">Modify</button>
        <button className="button-delete" onClick={e => deleteFunc(e, email)}>
          Delete
        </button>
      </div>
    ));
  }

  const deleteFunc = (e, email) => {
    console.log('FIRST ATTEMPT', userData);
    userData.filter(i => {
      console.log('THESE ARE EMAIL', i.email, email);
      if (i.email !== email) {
        console.log('TRUE!!!!!!');
        setUserData('');
        setUserData({ ...userData, i });
      }
    });
    console.log('SECOND ATTEMPT', userData);
    e.preventDefault();
    deleteUser({
      variables: { email: email },
    });
  };

  return (
    <div className="header">
      <div>
        <img className="eco-soap-logo" src={logo} alt="eco-soap bank logo" />
      </div>
      <h1 className="title">Admin Users</h1>
      <div className="page">
        <div className="users-form">
          <GetUsers />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
