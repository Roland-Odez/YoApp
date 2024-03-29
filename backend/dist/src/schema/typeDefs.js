export const typeDefs = `#graphql

  input MessageInput {
    sender: ID!
    reciever: ID!
    message: String!
    timeStamp: String!
    read: Boolean
  }

  input SignupInput {
    email: String!
    username: String!
    password: String!
    img: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateInput {
    name: String!
    value: String!
  }

  input usersId {
    reciever: String!
    sender: String!
  }

  type User {
    _id: ID!
    email: String!
    username: String!
    password: String!
    about: String
    friends: [User]
    img: String!
    lastSeen: String
  }

  type Query {
    getMessages(usersId: usersId!): [MessagePayload]
    getChats(userId: String!): [ChatPayload]
  }

  type Subscription {
    messageAdded(usersId: usersId!): MessagePayload
    userChats(userId: String!): [ChatPayload]
  }

  union SignUpResult = LoginSignUpPayload | FailedPayload
  union LoginResult = LoginSignUpPayload | FailedPayload
  union UserUpdateResult = UserUpdatePayload | FailedPayload
  union MessageResult = MessagePayload | FailedPayload

  type UserUpdatePayload {
    user: User
  }

  type ChatPayload {
    _id: ID!
    timeStamp: String
    read: Boolean
    message: String
    img: String
    name: String
  }

  type MessagePayload {
    _id: ID!
    sender: ID!
    reciever: ID!
    message: String
    timestamp: String
    read: Boolean
  }

  type LoginSignUpPayload {
    token: String
    user: User
  }

  type FailedPayload {
    text: String,
    statusCode: Int
  }

  type Mutation {
    createMessage(messageInput: MessageInput!): MessageResult
    signUp(signupInput: SignupInput!): SignUpResult
    logIn(loginInput: LoginInput!): LoginResult
    updateUser(updateInput: UpdateInput!): UserUpdateResult
  }
`;
