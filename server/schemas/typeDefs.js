const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
}

type Question {
    _id: ID!
    question: String!
}

type Auth {
    token: ID
    user: User
  }

type Query {
    questions: [Question]
    users: [User]
}

type Mutation {
    addQuestion: Question
}
`;

module.exports = typeDefs;
