"use client"

import { gql } from "@apollo/client";

  export const LOGIN_USER = gql`

    mutation LoginSignUp($loginInput: LoginInput!) {

        logIn(loginInput: $loginInput) {
            ... on SuccessPayload {
                token
                user {
                    _id,
                    email,
                    username
                }
            }
            ... on FailedPayload {
            message
            }
        }
    }
  `