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

  type Message {
    _id: ID!
    sender: ID!
    reciever: ID!
    message: String!
    timeStamp: String
    read: Boolean
  }

  type Query {
    users: [User]
    messages: [Message]
    user(id: ID!): User
  }

  type Subscription {
    messageAdded: Message
  }

  union SignUpResult = SuccessPayload | FailedPayload
  union LoginResult = SuccessPayload | FailedPayload

  type SuccessPayload {
    token: String
    user: User
  }

  type FailedPayload {
    message: String
  }

  type Mutation {
    createMessage(messageInput: MessageInput!): Message
    signUp(signupInput: SignupInput!): SignUpResult
    logIn(loginInput: LoginInput!): LoginResult
  }
`;
