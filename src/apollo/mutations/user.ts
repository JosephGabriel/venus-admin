import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation ($data: LoginUserInput!) {
    loginUser(data: $data) {
      token
      user {
        firstName
        lastName
        userName
        email
        avatar
        password
        id
        passwordChangedAt
        role
        active
        verified
      }
    }
  }
`;
