import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: UpsertCategory!) {
    createCategory(data: $data) {
      id
      title
      color
      icon
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: String!, $data: UpsertCategory!) {
    updateCategory(id: $id, data: $data) {
      id
      title
      color
      icon
      description
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;
