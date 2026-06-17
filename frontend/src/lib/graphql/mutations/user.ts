import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUser!) {
    createUser(data: $data) {
      id
      email
      name
    }
  }
`;
