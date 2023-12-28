export const typeDefs = `#graphql

  input MessageInput {
    id: ID
    sender: ID!
    reciever: ID!
    message: String!
    timeStamp: String!
    read: Boolean
  }

  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    about: String
    friends: [User]
    img: String!
    lastSeen: String
  }

  type Message {
    id: ID!
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

  type Mutation {
    createMessage(input: MessageInput!): Message
  }
`;
