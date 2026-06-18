import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      type
      description
      date
      value
      category {
        title
      }
    }
  }
`;
