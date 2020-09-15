import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

export const GET_TYPES = gql`
  query getTypes {
    types {
      id
      name
    }
  }
`;

export const ADD_TYPE = gql`
  mutation createType($name: String!, $fields: [FieldInput]!) {
    createType(input: { name: $name, fields: $fields }) {
      type {
        id
        name
      }
    }
  }
`;

export const UPDATE_TYPE = gql`
  mutation updateType(
    $id: ID!
    $name: String!
    $fields: [FieldInput!]
    $records: [RecordInput!]
  ) {
    updateType(
      input: { id: $id, name: $name, fields: $fields, records: $records }
    ) {
      type {
        id
        name
      }
    }
  }
`;

export const DELETE_TYPE = gql`
  mutation deleteType($id: ID!) {
    deleteType(input: { id: $id }) {
      success
      error
    }
  }
`;
