import { gql } from '@apollo/client';

// Various GraphQL Queries for User Modification
export const GET_USERS = gql`
  query getUsers {
    users {
      id
      email
      password
    }
  }
`;

export const NEW_USER = gql`
  mutation registerNewUser($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      success
      error
    }
  }
`;

export const UPDATE_USER = gql`
  mutation editUser($userId: ID!, $email: String!, $password: String!) {
    updateUserProfile(
      input: { userId: $userId, email: $email, password: $password }
    ) {
      user {
        id
        email
        password
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteAdmin($email: String!) {
    deleteUser(input: { email: $email }) {
      success
      error
    }
  }
`;
