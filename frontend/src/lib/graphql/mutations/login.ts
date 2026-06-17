import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: Login!) {
    login(data: $data) {
      token
      # refreshToken
      user {
        id
        name
        email
      }
    }
  }
`;
