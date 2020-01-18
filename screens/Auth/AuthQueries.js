import gql from 'graphql-tag';

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const DO_LOGIN = gql`
  mutation doLogin($email: String!, $password: String!){
    doLogin(email: $email, password: $password)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!){
    confirmSecret(secret: $secret, email: $email)
  }
`;
export const CREATE_ACCOUNT = gql`
  mutation createAccount($nickName: String!, $email: String!, $firstName: String!,$lastName: String!,$password: String!){
    createAccount(nickName: $nickName, email: $email, firstName: $firstName, lastName: $lastName, password: $password)
  }
`;