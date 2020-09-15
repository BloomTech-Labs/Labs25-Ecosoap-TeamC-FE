import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import './TypeModification.css';

let GET_TYPES = gql`
  query getTypes {
    types {
      id
      name
    }
  }
`;

// Add Type Not Yet Working
let ADD_TYPE = gql`
  mutation createType($name: String!, $fields: [FieldInput]!) {
    createType(input: { name: $name, fields: $fields }) {
      type {
        id
        name
      }
    }
  }
`;

let DELETE_TYPE = gql`
  mutation deleteType($id: ID!) {
    deleteType(input: { id: $id }) {
      success
      error
    }
  }
`;

const TypeModification = () => {
  return <h1>Test</h1>;
};

export default TypeModification;
