const typeDefs = `
type User {
    _id: ID!
    name: String
    email: String
    password: String
}

type Question {
    _id: ID!
    question: String!
    industry: String!
    answer: String
    feedback: String
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    questions: [Question!]
    question(_id: ID!): Question!
    allUsers: [User!]
    findUserById(id: ID!): User!
}

type Mutation {
    addQuestion(industry: String!, role: String!, experience: String!): Question!
    addAnswer(_id: String!, answer: String!): Question!
    getFeedback(_id: String!): Question!
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
