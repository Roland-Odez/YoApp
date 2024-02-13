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
export const SIGNUP_USER = gql`
    mutation SignUp($signupInput: SignupInput!) {
        signUp(signupInput: $signupInput) {
            ... on SuccessPayload {
                token
                user {
                    _id
                    email
                    username
                    about
                }
            }
            ... on FailedPayload {
            message
            }
        }
    }
`