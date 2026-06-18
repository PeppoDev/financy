import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: UpsertTransaction!) {
    createTransaction(data: $data) {
      id
      type
      description
      date
      value
      category {
        id
        title
      }
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: String!, $data: UpsertTransaction!) {
    updateTransaction(id: $id, data: $data) {
      id
      type
      description
      date
      value
      category {
        id
        title
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;
