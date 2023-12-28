export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    username: String!
    about: String
    friends: [User]
    img: String!
    lastSeen: String
  }

  type Message {
    id: ID!
    sender: User!
    reciever: User!
    message: String!
    timeStamp: String
    read: Boolean
  }

  type Query {
    users: [User]
    messages: [Message]
    user(id: ID!): User
  }
`;
