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
