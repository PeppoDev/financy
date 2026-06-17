import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUser!) {
    register(data: $data) {
      id
      email
      name
    }
  }
`;
