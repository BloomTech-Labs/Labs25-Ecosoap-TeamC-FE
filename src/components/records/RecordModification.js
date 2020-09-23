import { gql } from '@apollo/client';

// Various GraphQL Queries for Record Modification
export const GET_RECORDS = gql`
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

export const NEW_RECORD = gql`
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

export const UPDATE_RECORD = gql`
  mutation updateRecord(
    $id: ID!
    $name: String!
    $coordinates: CoordinatesInput!
    $fields: [FieldInput!]
  ) {
    updateRecord(
      input: {
        id: $id
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

export const DELETE_RECORD = gql`
  mutation deleteRecord($id: ID!) {
    deleteRecord(input: { id: $id }) {
      success
      error
    }
  }
`;
