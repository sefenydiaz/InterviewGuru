const typeDefs = `
type Question {
    _id: ID!
    question: String!
    industry: String!
    role: String!
    experience: String!
    answer: String
    feedback: String
}

type User {
    _id: ID!
    name: String
    email: String
    password: String
    questions: [Question]
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
    deleteUser(_id: String!): User
    login(email: String!, password: String!): Auth
    addQuestionToUser(userId: String!, questionId: String!): User
}
`;

module.exports = typeDefs;
