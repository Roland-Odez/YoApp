"use client"

import { gql } from "@apollo/client";

  export const LOGIN_USER = gql`

    mutation LoginSignUp($loginInput: LoginInput!) {

        logIn(loginInput: $loginInput) {
            ... on LoginSignUpPayload {
                token
                user {
                    _id,
                    email,
                    username,
                    about,
                    img
                }
            }
            ... on FailedPayload {
            text,
            statusCode
            }
        }
    }
  `
export const SIGNUP_USER = gql`
    mutation SignUp($signupInput: SignupInput!) {
        signUp(signupInput: $signupInput) {
            ... on LoginSignUpPayload {
                token
                user {
                    _id,
                    email,
                    username,
                    about,
                    img
                }
            }
            ... on FailedPayload {
            text,
            statusCode
            }
        }
    }
`

export const GET_USER_CHAT = gql`
    query GetChats($userId: String!) {
        getChats(userId: $userId) {
            _id
            message
            name
            img
            timeStamp
            read
        }
    }
`

export const CHAT_SUBSCRIPTION = gql`
    subscription UserChats($userId: String!) {
        userChats(userId: $userId) {
            _id
            message
            name
            img
            timeStamp
            read
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser($updateInput: UpdateInput!) {
        updateUser(updateInput: $updateInput) {
            ... on UserUpdatePayload {
                user {
                    _id,
                    username,
                    email,
                    img,
                    about

                }
            }
                ... on FailedPayload {
                text,
                statusCode
            }
        }
    }
`
export const GET_UNREAD_MESSAGE_COUNT = gql`
    query Query($usersId: usersId!) {
        getUnreadMessageCount(usersId: $usersId){
            totalUnread
        }
    }
`