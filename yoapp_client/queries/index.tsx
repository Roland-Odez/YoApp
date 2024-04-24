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

export const LOG_OUT_USER = gql`
    mutation LogOut {
        logOut {
            _id,
            email,
            username,
            about,
            img
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
            userId
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
            userId
        }
    }
`

export const MESSAGE_SUBSCRIPTION = gql`
    subscription MessageAdded($usersId: usersId!) {
        messageAdded(usersId: $userId) {
            _id
            message
            name
            img
            timeStamp
            read
            userId
        }
    }
`

export const STATUS_SUBSCRIPTION = gql`
    subscription StatusChanged($userId: userId!) {
        statusChanged(userId: $userId) {
            lastSeen
            online
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
export const UPDATE_USER_STATUS = gql`
    mutation UpdateUserStatus($statusInput: StatusInput!) {
        updateUserStatus(statusInput: $statusInput) {
            ... on UserUpdatePayload {
                user {
                    _id,
                    online,
                    lastSeen
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
export const GET_CHAT_MESSAGES = gql`
    query GetMessages($usersId: usersId!) {
        getMessages(usersId: $usersId) {
        _id
        sender
        reciever
        message
        timestamp
        read
        }
    }
`

export const GET_USER = gql`
    query GetUser($userId: String!) {
        getUser(userId: $userId) {
            _id
            email
            username
            about
            img
            lastSeen
            online
        }
    }
`

export const GET_USER_STATUS = gql`
    query GetUserStatus($userId: String!) {
        getUser(userId: $userId) {
            lastSeen
            online
        }
    }
`