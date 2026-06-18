import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
    }
  }
`;
