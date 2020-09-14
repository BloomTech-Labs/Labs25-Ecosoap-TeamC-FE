import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import './RecordModification.css';

let GET_RECORDS = gql`
  query getRecords {
    records {
      id
      name
      type {
        name
      }
      coordinates {
        latitude
        longitude
      }
      fields {
        name
        value
      }
    }
  }
`;

// Add Record Not Working Yet
let ADD_RECORD = gql`
  mutation registerNewRecord(
    $typeId: ID!
    $name: String!
    $coordinates: CoordinatesInput!
    $fields: [FieldInput]!
  ) {
    createRecord(
      input: {
        typeId: $typeId
        name: $name
        coordinates: $coordinates
        fields: $fields
      }
    ) {
      record {
        id
        name
        coordinates {
          latitude
          longitude
        }
        fields {
          name
          value
        }
      }
    }
  }
`;

let DELETE_RECORD = gql`
  mutation deleteRecord($id: ID!) {
    deleteRecord(input: { id: $id }) {
      success
      error
    }
  }
`;

const RecordModification = () => {
  return <h1>Test</h1>;
};

export default RecordModification;
